# Security Policy

## Reporting a security issue

Please do not publish sensitive security issues in a public GitHub issue.

If you discover a vulnerability, contact the repository maintainer privately through the contact method listed on the GitHub repository profile or security advisory page.

When reporting, include:

- affected version or commit
- steps to reproduce
- expected impact
- relevant logs or screenshots with secrets removed

Never include API keys, access tokens, passwords, private customer data, or other credentials in a report.

## Secrets

`OPENAI_API_KEY` is optional and must be stored only in local environment files such as `.env.local`. The repository intentionally ignores local `.env` files while keeping `.env.example` tracked.
