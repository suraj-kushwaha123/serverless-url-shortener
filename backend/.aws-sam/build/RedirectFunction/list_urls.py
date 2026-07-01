import boto3
from boto3.dynamodb.conditions import Key

from common import URLS_TABLE, get_user_id, response

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(URLS_TABLE)


def lambda_handler(event, context):
    user_id = get_user_id(event)

    if not user_id:
        return response(401, {"message": "Authentication is required."})

    result = table.query(
        IndexName="UserIdIndex",
        KeyConditionExpression=Key("userId").eq(user_id),
        ScanIndexForward=False,
    )

    return response(200, result.get("Items", []))
