import base64
import json
import os
from datetime import datetime, timezone
from decimal import Decimal
from urllib.parse import urlparse

URLS_TABLE = os.environ["URLS_TABLE"]
CLICKS_TABLE = os.environ["CLICKS_TABLE"]
CLICK_EVENTS_QUEUE_URL = os.environ.get("CLICK_EVENTS_QUEUE_URL", "")
ANALYTICS_BUCKET = os.environ.get("ANALYTICS_BUCKET", "")
PUBLIC_BASE_URL = os.environ.get("PUBLIC_BASE_URL", "")

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
}


def response(status_code, body=None, headers=None):
    return {
        "statusCode": status_code,
        "headers": {**CORS_HEADERS, **(headers or {})},
        "body": "" if body is None else json.dumps(body, default=to_json),
    }


def redirect_response(location):
    return {
        "statusCode": 302,
        "headers": {
            **CORS_HEADERS,
            "Location": location,
            "Cache-Control": "no-store",
        },
        "body": "",
    }


def parse_body(event):
    body = event.get("body") or "{}"

    if event.get("isBase64Encoded"):
        body = base64.b64decode(body).decode("utf-8")

    try:
        return json.loads(body)
    except json.JSONDecodeError:
        return {}


def get_query_param(event, name, default=""):
    params = event.get("queryStringParameters") or {}
    return params.get(name, default)


def get_path_param(event, name):
    params = event.get("pathParameters") or {}
    return params.get(name, "")


def get_user_id(event, body=None):
    claims = (
        event.get("requestContext", {})
        .get("authorizer", {})
        .get("claims", {})
    )

    return (
        claims.get("sub")
        or claims.get("cognito:username")
        or (body or {}).get("userId")
        or get_query_param(event, "userId")
    )


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def to_epoch_days(days):
    return int(datetime.now(timezone.utc).timestamp()) + days * 86400


def normalize_url(value):
    parsed = urlparse(value)

    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        return ""

    return value


def client_ip(event):
    identity = event.get("requestContext", {}).get("identity", {})
    headers = event.get("headers") or {}
    forwarded_for = headers.get("X-Forwarded-For") or headers.get("x-forwarded-for")

    if forwarded_for:
        return forwarded_for.split(",")[0].strip()

    return identity.get("sourceIp", "")


def user_agent(event):
    headers = event.get("headers") or {}
    return headers.get("User-Agent") or headers.get("user-agent") or ""


def referrer(event):
    headers = event.get("headers") or {}
    return headers.get("Referer") or headers.get("referer") or "Direct"


def to_json(value):
    if isinstance(value, Decimal):
        return int(value) if value % 1 == 0 else float(value)

    raise TypeError(f"Object of type {type(value).__name__} is not JSON serializable")
