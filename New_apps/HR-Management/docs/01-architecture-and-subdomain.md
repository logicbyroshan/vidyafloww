# Architecture & Subdomain Routing: Operational HR & Staff Management

## 1. Subdomain & Ingress Strategy
- **Production URL**: `https://hr.vidyafloww.com`
- **Local Dev URL**: `http://localhost:8013`
- **Reverse Proxy Ingress**: Nginx routes incoming traffic for `hr.vidyafloww.com` to port `8013` (frontend) and port `8113` (backend API).

## 2. SSO & Authentication Handshake
When a user accesses this subsystem from the main portal (`https://app.vidyafloww.com`), an encrypted session token (JWT) is passed via cookie or query handshake:
1. User clicks subsystem tile in Main Portal.
2. Main portal issues short-lived exchange ticket.
3. Subsystem validates ticket against main auth service and sets local scoped session cookie.
