# Piloto HTTPS

1. Configure a DNS name under institutional control and obtain an X.509 certificate from a trusted CA.
2. Configure the reverse proxy to terminate TLS, redirect HTTP to HTTPS and set `X-Forwarded-Proto` itself after removing any client supplied value.
3. Load the variables in `.env.pilot.example` from the deployment secret store, including `BEHIND_HTTPS_PROXY=True`.
4. Run `python manage.py check --deploy` before allowing access. Enable HSTS subdomains/preload only after every subdomain is HTTPS-only.
5. Do not expose PostgreSQL or Redis to the public network; the existing Compose configuration binds Redis to loopback only.

The repository configures Django's HTTPS, cookie and security-header settings. Certificate issuance, DNS ownership and reverse-proxy enforcement require the pilot infrastructure owner and are not simulated by development Compose.
