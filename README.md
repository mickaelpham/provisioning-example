# Provisioning Example

An example application using a PostgreSQL database to provision an account.
Illustrate how to leverage Stripe `/v1/events` endpoint to poll and update local
models, instead of relying on synchronous updates (during the HTTP request) or
webhooks.
