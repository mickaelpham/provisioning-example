# Provisioning Example

An example application using a PostgreSQL database to provision an account. It
illustrates how to leverage Stripe `/v1/events` endpoint to poll and update
local models, instead of relying on synchronous updates (during the HTTP
request) or webhooks.

## Configuration

Make a copy of the `.env.example` file and fill in the blanks.

```
cp .env.example .env
```

| name                | description                 |
| ------------------- | --------------------------- |
| `DATABASE_URL`      | A PostgreSQL connection URL |
| `STRIPE_SECRET_KEY` | Your Stripe API Secret Key  |

## Usage

Install the dependencies:

```
npm install
```

Start the web server in development mode:

```
npm run dev
```

Start the CRON job to process events in a separate terminal window:

```
npm run cron
```
