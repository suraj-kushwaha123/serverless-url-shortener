import json
import uuid
from datetime import datetime, timezone

import boto3

from common import ANALYTICS_BUCKET, CLICKS_TABLE, to_epoch_days

dynamodb = boto3.resource("dynamodb")
s3 = boto3.client("s3")
table = dynamodb.Table(CLICKS_TABLE)


def lambda_handler(event, context):
    for record in event.get("Records", []):
        click = json.loads(record["body"])
        clicked_at = click.get("clickedAt") or datetime.now(timezone.utc).isoformat()
        click_id = str(uuid.uuid4())
        parsed_at = parse_datetime(clicked_at)
        enriched = {
            **click,
            "clickId": click_id,
            "clickedAt": clicked_at,
            "clickedDate": parsed_at.date().isoformat(),
            "device": detect_device(click.get("userAgent", "")),
            "browser": detect_browser(click.get("userAgent", "")),
            "source": normalize_source(click.get("referrer", "")),
            "country": click.get("country") or click.get("cloudFrontViewerCountry") or "Unknown",
            "expiresAt": to_epoch_days(365),
        }

        table.put_item(
            Item={
                "shortCode": enriched["shortCode"],
                "clickedAt": f"{clicked_at}#{click_id}",
                **enriched,
            }
        )

        s3.put_object(
            Bucket=ANALYTICS_BUCKET,
            Key=s3_key(enriched),
            Body=(json.dumps(enriched) + "\n").encode("utf-8"),
            ContentType="application/json",
        )

    return {"batchItemFailures": []}


def parse_datetime(value):
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return datetime.now(timezone.utc)


def s3_key(click):
    parsed_at = parse_datetime(click["clickedAt"])

    return (
        "click-events/"
        f"year={parsed_at.year}/"
        f"month={parsed_at.month:02d}/"
        f"day={parsed_at.day:02d}/"
        f"{click['shortCode']}-{click['clickId']}.json"
    )


def detect_device(user_agent):
    value = user_agent.lower()

    if "tablet" in value or "ipad" in value:
        return "Tablet"

    if "mobile" in value or "iphone" in value or "android" in value:
        return "Mobile"

    return "Desktop"


def detect_browser(user_agent):
    value = user_agent.lower()

    if "edg/" in value:
        return "Edge"

    if "chrome/" in value and "chromium" not in value:
        return "Chrome"

    if "firefox/" in value:
        return "Firefox"

    if "safari/" in value and "chrome/" not in value:
        return "Safari"

    return "Unknown"


def normalize_source(referrer):
    if not referrer or referrer == "Direct":
        return "Direct"

    lowered = referrer.lower()

    if "google." in lowered:
        return "Google"

    if "linkedin." in lowered:
        return "LinkedIn"

    if "facebook." in lowered:
        return "Facebook"

    if "x.com" in lowered or "twitter." in lowered:
        return "Twitter"

    return referrer.split("/")[2] if "://" in referrer else referrer
