# Provisioning Example

An example application using a PostgreSQL database to provision an account. It illustrates how to leverage Stripe `/v1/events` endpoint to poll and update local models, instead of relying on synchronous updates (during the HTTP request) or webhooks.

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

## Some observations

Stripe `/v1/events` endpoint returns a list of events that may be paginated (this comes from the `has_more: true` parameter) thus we need to use the last `event.id` value to make a follow up request with the `starting_after: <event_id>` parameter.

However, it's not quite right to use the `starting_after` parameter in order to retrieve the most recent events, because the last inserted event in the database might not be the most recent one, that's the issue with pagination. Instead I should be relying on the `created.gt` parameter. This might create an issue where I miss some events though (that were created at the exact same second). So I will need to use `gte` and eliminate duplicate events.
