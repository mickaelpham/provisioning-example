# Provisioning Example

An example application using a PostgreSQL database to provision an account.
Illustrate how to leverage Stripe `/v1/events` endpoint to poll and update local
models, instead of relying on synchronous updates (during the HTTP request) or
webhooks.

## Configuration

```
cp .env.example .env
```

| name                | description                 |
| ------------------- | --------------------------- |
| `DATABASE_URL`      | A PostgreSQL connection URL |
| `STRIPE_SECRET_KEY` | Your Stripe API Secret Key  |

## Usage

Start the web server in development mode:

```
npm run dev
```

Start the CRON job to process events in a separate terminal:

```
npm run cron
```
