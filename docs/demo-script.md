# Demo Script

Use this as the checklist for the expected recorded demonstration.

1. Open the deployed CloudFront URL.
2. Register a user with email and password.
3. Confirm the Cognito verification code.
4. Sign in and create a short link for a public website.
5. Copy the short URL and open it in a new tab.
6. Return to the app and show the click count or analytics dashboard.
7. Open DynamoDB and show the URL item plus click records.
8. Open SQS and show the click event queue configuration.
9. Open S3 and show analytics files under `click-events/year=YYYY/month=MM/day=DD/`.
10. Open Athena and run a query against `click_events`.
11. Open QuickSight and show the dashboard visuals.
12. Open CloudWatch and X-Ray to show alarms/tracing are enabled.

Suggested Athena query:

```sql
SELECT
  shortCode,
  device,
  browser,
  source,
  country,
  count(*) AS clicks
FROM click_events
GROUP BY shortCode, device, browser, source, country
ORDER BY clicks DESC;
```
