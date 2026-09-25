import boto3

from common import URLS_TABLE, get_path_param, get_user_id, response

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(URLS_TABLE)


def lambda_handler(event, context):
    short_code = get_path_param(event, "shortCode")
    user_id = get_user_id(event)

    if not user_id:
        return response(401, {"message": "Authentication is required."})

    current = table.get_item(Key={"shortCode": short_code}).get("Item")

    if not current:
        return response(404, {"message": "Short URL not found."})

    if current.get("userId") != user_id:
        return response(403, {"message": "You cannot delete this URL."})

    table.delete_item(Key={"shortCode": short_code})

    return response(200, {"message": "URL deleted successfully."})
