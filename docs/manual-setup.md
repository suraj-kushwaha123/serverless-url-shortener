# Manual Setup Checklist

Most of the capstone requirements are deployed by `backend/template.yaml`. These items still need manual action in your AWS account or submission package.

## AWS Account Setup

1. Configure AWS CLI credentials and region.

```bash
aws configure
```

Use `ap-south-1` unless you intentionally deploy to another region.

2. Install required deployment tools if they are not already installed.

```bash
sam --version
aws --version
node --version
npm --version
```

## Backend Deployment

```bash
cd backend
sam build
sam deploy --guided --region ap-south-1
```

Save these SAM outputs after deployment:

- `ApiBaseUrl`
- `UserPoolId`
- `UserPoolClientId`
- `CloudFrontUrl`
- `SiteBucketName`
- `AnalyticsBucketName`

## Frontend Configuration

Create `frontend/.env` from `frontend/.env.example` and paste your SAM outputs:

```bash
VITE_API_BASE_URL=<ApiBaseUrl>
VITE_COGNITO_USER_POOL_ID=<UserPoolId>
VITE_COGNITO_USER_POOL_CLIENT_ID=<UserPoolClientId>
```

Then build the frontend:

```bash
cd frontend
npm install
npm run build
```

Upload the contents of `frontend/dist/` to the S3 bucket from `SiteBucketName`, then open `CloudFrontUrl`.

## Custom Domain

This is optional unless your evaluator specifically requires a custom domain.

1. Request or import an ACM certificate in `us-east-1` for the frontend domain.
2. Make sure the domain has a Route 53 hosted zone.
3. Redeploy SAM with:

```bash
sam deploy --region ap-south-1 `
  --parameter-overrides `
  FrontendDomainName=short.example.com `
  CertificateArn=arn:aws:acm:us-east-1:123456789012:certificate/your-certificate-id `
  HostedZoneId=YOUR_HOSTED_ZONE_ID
```

CloudFront certificates must be in `us-east-1`, even when the stack runs in `ap-south-1`.

## QuickSight Dashboard

QuickSight is not fully portable across all student AWS accounts, so create it manually after the stack has click data.

1. Open Amazon QuickSight and finish account setup if it is not enabled.
2. Allow QuickSight access to the analytics S3 bucket.
3. Create a dataset from Athena.
4. Choose the workgroup named `<stack-name>-analytics`.
5. Choose the Glue database named `<stack-name>_analytics`.
6. Select the `click_events` table.
7. Build visuals for clicks by day, traffic source, device, browser, country, and top short codes.

## Demo Recording

Record a short screen demo that shows:

1. User sign-up and sign-in through Cognito.
2. Creating a short URL.
3. Opening the short URL and seeing the redirect.
4. Dashboard analytics updating after redirect clicks.
5. AWS console evidence for DynamoDB, SQS, S3 partitioned events, CloudWatch alarm, X-Ray tracing, Athena, and QuickSight.
