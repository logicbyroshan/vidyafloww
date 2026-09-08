# Architecture & Subdomain Routing: Digital E-Library & Reading Hub

## 1. Subdomain & Ingress Strategy
- **Production URL**: `https://library.vidyafloww.com`
- **Local Dev URL**: `http://localhost:8014`
- **Reverse Proxy Ingress**: Nginx routes incoming traffic for `library.vidyafloww.com` to port `8014` (frontend) and port `8114` (backend API).

## 2. SSO & Authentication Handshake
When a user accesses this subsystem from the main portal (`https://app.vidyafloww.com`), an encrypted session token (JWT) is passed via cookie or query handshake:
1. User clicks subsystem tile in Main Portal.
2. Main portal issues short-lived exchange ticket.
3. Subsystem validates ticket against main auth service and sets local scoped session cookie.
