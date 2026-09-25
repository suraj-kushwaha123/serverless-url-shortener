# Requirements Coverage

This repository now contains the source code needed for the serverless URL shortener capstone. The frontend is a Vite React app, and the backend is an AWS SAM stack under `backend/`.

| Requirement | Status | Implementation |
| --- | --- | --- |
| API Gateway + Lambda shortening API | Present | `backend/template.yaml`, `backend/src/shorten.py` |
| DynamoDB short code mapping | Present | `UrlsTable` in `backend/template.yaml` |
| Redirect flow with DynamoDB lookup | Present | `backend/src/redirect.py` returns HTTP 302 |
| Async click publish to SQS | Present | `RedirectFunction` sends messages to `ClickEventsQueue` |
| Analytics consumer Lambda | Present | `backend/src/analytics_ingest.py` consumes SQS |
| Partitioned S3 analytics events | Present | S3 keys use `year=YYYY/month=MM/day=DD/` partitions |
| Athena support | Present | `AthenaWorkGroup` plus Glue `click_events` table over partitioned S3 data |
| QuickSight dashboard | Manual setup | Create from the Athena/Glue `click_events` dataset; steps are in `docs/manual-setup.md` |
| React frontend | Present | `frontend/src` |
| Static hosting on S3 + CloudFront | Present | `SiteBucket`, `SiteDistribution`, and OAC in SAM |
| Authentication with Cognito | Present | SAM `UserPool` and frontend Amplify config |
| Infrastructure as Code | Present | AWS SAM template in `backend/template.yaml` |
| Custom domain with Route 53 + ACM | Present | Optional `FrontendDomainName`, `CertificateArn`, and `HostedZoneId` parameters |
| CloudWatch Lambda error alarm | Present | `LambdaErrorAlarm` |
| AWS X-Ray tracing | Present | API Gateway and Lambda tracing enabled |
| Real working analytics data | Present after deployment | Redirects create real click records in DynamoDB and S3; analytics UI reads `/analytics` |
| Architecture diagram | Present | `docs/architecture.md` |
| Cost report | Present | `docs/cost-report.md` |
| Recorded demo | Manual deliverable | Use `docs/demo-script.md` as the recording checklist |

## Notes

- Country-level analytics are only as accurate as the request data available to Lambda. The current implementation stores `Unknown` unless a trusted upstream layer adds a country value. Device, browser, source, timestamps, and click counts are generated from real redirect requests.
- QuickSight dashboards are not fully representable as portable CloudFormation in many student AWS accounts. Use Athena against the partitioned S3 data as the QuickSight source.
- Frontend AWS values must be copied from SAM outputs into `frontend/.env`; the app no longer falls back to a previous hardcoded AWS stack.
