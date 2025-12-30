# Resend Discord Webhook

A Cloudflare Worker that forwards email notifications from Resend to Discord via webhooks.

A single environment secret is requred: `WEBHOOK_URL`, Discord webhook URL

## Usage

Configure your Resend webhook to send email events to your deployed worker URL. The worker will:

1. Accept POST requests with email event data
1. Parse and validate the email information
1. Format it into a Discord embed message
1. Send to your configured Discord webhook
