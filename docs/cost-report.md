# Cost Report

This design uses serverless, pay-per-use services. For a student demo or low-traffic project, most usage should stay inside or near AWS Free Tier limits, but exact cost depends on account eligibility and actual traffic.

| Service | Cost Driver | Low-Traffic Impact |
| --- | --- | --- |
| AWS Lambda | Requests and duration | Usually very low for short handlers |
| API Gateway | API requests | Scales with shorten, list, analytics, and redirect calls |
| DynamoDB | Read/write request units and storage | PAY_PER_REQUEST avoids idle capacity cost |
| SQS | Requests | Low cost for click event buffering |
| S3 analytics bucket | Stored click event JSON and Athena results | Low for small JSON events |
| S3 site bucket | Static frontend assets | Low storage cost |
| CloudFront | Data transfer and requests | Usually low for a small frontend |
| Cognito | Monthly active users | Often free for small user counts |
| Athena | Data scanned by queries | Keep JSON partitions narrow to reduce scans |
| QuickSight | User/session pricing | Can become the largest cost if enabled |
| Route 53 | Hosted zone and DNS queries | Hosted zone has a monthly charge |
| ACM | Public certificates | No extra cost for public ACM certificates |
| CloudWatch/X-Ray | Logs, metrics, traces | Keep log retention reasonable for demos |

## Example Traffic Bands

| Monthly Traffic | Expected Cost Shape |
| --- | --- |
| 1,000 redirects | Mostly Free Tier if eligible; tiny DynamoDB/SQS/S3 footprint |
| 100,000 redirects | API Gateway and Lambda become visible but still modest; Athena depends on query frequency |
| 1,000,000 redirects | API Gateway, Lambda, DynamoDB writes, and CloudWatch logs should be monitored closely |

## Cost Controls

- DynamoDB uses on-demand billing to avoid provisioned idle capacity.
- Click records have a 365-day TTL in DynamoDB.
- S3 analytics data is partitioned by date for lower Athena scan cost.
- CloudWatch alarms catch Lambda errors early before retries create waste.
- For demos, avoid enabling QuickSight unless the dashboard recording is required.
