import json

import boto3

from common import (
    CLICK_EVENTS_QUEUE_URL,
    URLS_TABLE,
    client_ip,
    get_path_param,
    now_iso,
    redirect_response,
    referrer,
    response,
    user_agent,
)

dynamodb = boto3.resource("dynamodb")
sqs = boto3.client("sqs")
table = dynamodb.Table(URLS_TABLE)


def lambda_handler(event, context):
    short_code = get_path_param(event, "shortCode")

    if not short_code:
        return response(400, {"message": "Short code is required."})

    item = table.get_item(Key={"shortCode": short_code}).get("Item")

    if not item:
        return response(404, {"message": "Short URL not found."})

    clicked_at = now_iso()

    table.update_item(
        Key={"shortCode": short_code},
        UpdateExpression="SET clicks = if_not_exists(clicks, :zero) + :one, updatedAt = :updatedAt",
        ExpressionAttributeValues={
            ":zero": 0,
            ":one": 1,
            ":updatedAt": clicked_at,
        },
    )

    sqs.send_message(
        QueueUrl=CLICK_EVENTS_QUEUE_URL,
        MessageBody=json.dumps(
            {
                "shortCode": short_code,
                "longUrl": item["longUrl"],
                "userId": item["userId"],
                "clickedAt": clicked_at,
                "ipAddress": client_ip(event),
                "userAgent": user_agent(event),
                "referrer": referrer(event),
            }
        ),
    )

    return redirect_response(item["longUrl"])
