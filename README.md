# Serverless URL Shortener

This project is a serverless URL shortening service with authenticated URL management and real click analytics.

## Structure

- `frontend/` - React + Vite app.
- `backend/` - AWS SAM infrastructure and Lambda handlers.
- `docs/` - requirement coverage, architecture, and cost report.

## Deploy Backend

```bash
cd backend
sam build
sam deploy --guided --region ap-south-1
```

After deployment, copy the SAM outputs into `frontend/.env`. Start from `frontend/.env.example`:

```bash
VITE_API_BASE_URL=https://your-api-id.execute-api.ap-south-1.amazonaws.com/prod
VITE_COGNITO_USER_POOL_ID=your-user-pool-id
VITE_COGNITO_USER_POOL_CLIENT_ID=your-user-pool-client-id
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

For the full submission checklist, QuickSight steps, custom domain notes, and demo recording checklist, see `docs/manual-setup.md` and `docs/demo-script.md`.

## Real Analytics

The analytics dashboard uses real backend data:

- URL click counters are stored in DynamoDB.
- Redirect click events are sent to SQS.
- The analytics ingest Lambda writes detailed click records to DynamoDB and partitioned S3 objects.
- The React analytics page calls `GET /analytics` for live dashboard data.

No dummy analytics data is required for the running application.
