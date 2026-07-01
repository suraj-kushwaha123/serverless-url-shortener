import base64
import hashlib
import secrets

import boto3
from botocore.exceptions import ClientError

from common import PUBLIC_BASE_URL, URLS_TABLE, get_user_id, normalize_url, now_iso, parse_body, response

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(URLS_TABLE)


def lambda_handler(event, context):
    body = parse_body(event)
    user_id = get_user_id(event, body)
    long_url = normalize_url(body.get("url", "").strip())

    if not user_id:
        return response(401, {"message": "Authentication is required."})

    if not long_url:
        return response(400, {"message": "A valid http or https URL is required."})

    created_at = now_iso()
    short_code = create_short_code(long_url, user_id)

    item = {
        "shortCode": short_code,
        "longUrl": long_url,
        "userId": user_id,
        "clicks": 0,
        "createdAt": created_at,
        "updatedAt": created_at,
    }

    for _ in range(5):
        try:
            table.put_item(
                Item=item,
                ConditionExpression="attribute_not_exists(shortCode)",
            )
            break
        except ClientError as error:
            if error.response["Error"]["Code"] != "ConditionalCheckFailedException":
                raise

            short_code = secrets.token_urlsafe(5)[:7]
            item["shortCode"] = short_code
    else:
        return response(409, {"message": "Could not generate a unique short URL."})

    return response(
        201,
        {
            **item,
            "shortUrl": f"{get_public_base_url(event)}/{short_code}",
        },
    )


def create_short_code(long_url, user_id):
    seed = f"{user_id}:{long_url}:{secrets.token_urlsafe(8)}".encode("utf-8")
    return base64.urlsafe_b64encode(hashlib.sha256(seed).digest()).decode("utf-8")[:7]


def get_public_base_url(event):
    if PUBLIC_BASE_URL:
        return PUBLIC_BASE_URL.rstrip("/")

    context = event.get("requestContext", {})
    domain_name = context.get("domainName", "")
    stage = context.get("stage", "")

    if not domain_name:
        return ""

    base_url = f"https://{domain_name}"

    return f"{base_url}/{stage}" if stage and stage != "$default" else base_url
