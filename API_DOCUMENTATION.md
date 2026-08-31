# VidyaFloww Enterprise API Documentation

> **Version**: `v2.6.0`  
> **Protocol**: RESTful JSON over HTTPS (TLS 1.3 / HTTP/2)  
> **Base URL**: `https://api.vidyafloww.edu.in/api/v1`  
> **Specification Standard**: OpenAPI 3.1 & CBSE Cloud IT Security Guidelines

---

## 1. Overview & Architecture

VidyaFloww is an enterprise-grade School ERP & Institutional Intelligence Platform. All API interactions follow strict REST conventions, utilizing standard HTTP status codes, structured JSON error objects, JSON Web Tokens (JWT) for stateless authentication, and multi-tenant isolation.

```
┌────────────────────────────────────────────────────────┐
│               VidyaFloww Client Layer                   │
│   (Web Portal / Mobile App / Desktop Electron App)     │
└─────────────────────────┬──────────────────────────────┘
                          │ HTTPS / WSS
                          ▼
┌────────────────────────────────────────────────────────┐
│               API Gateway & WAF Layer                  │
│    • Rate Limiting (Token Bucket)                      │
│    • SSL Termination & CORS Validation                 │
│    • Tenant Subdomain Resolution                       │
└─────────────────────────┬──────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────┐
│                 Core API Microservices                 │
│  • Auth & Identity   • Admissions & OCR                │
│  • Attendance Engine • Finance & Fees Gateway          │
│  • CBSE Examination  • Academics & Timetable           │
└────────────────────────────────────────────────────────┘
```

---

## 2. Authentication & Security Standard

### Headers
Every authenticated request MUST include the standard Authorization header:
```http
Authorization: Bearer <ACCESS_TOKEN>
X-Tenant-ID: <INSTITUTION_ID>
Content-Type: application/json
```

### Token Lifecycle
1. **Access Token**: Short-lived JWT (`15 minutes`) containing user identity, role, and permission scopes.
2. **Refresh Token**: Long-lived secure HTTP-Only cookie (`7 days`) used exclusively at `/api/v1/auth/refresh` with rotation.
3. **Session Revocation**: Logging out or resetting password invalidates all active refresh tokens in Redis.

---

## 3. Endpoints Specification

### 3.1 `POST /api/v1/auth/login`
Authenticates a user via institutional credentials.

- **Access**: Public
- **Rate Limit**: `5 requests / min per IP`

#### Request Payload
```json
{
  "identifier": "admin@vidyafloww.edu.in",
  "password": "YourSecurePassword@2026",
  "rememberMe": true,
  "deviceInfo": {
    "deviceId": "dev_84f912c0",
    "platform": "web_chrome_windows",
    "ipAddress": "203.0.113.195"
  }
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "user": {
    "id": "usr_849201",
    "name": "Roshan Singh",
    "email": "admin@vidyafloww.edu.in",
    "role": "super_admin",
    "tenantId": "sch_springfield_delhi",
    "institutionName": "Springfield Academy",
    "activeSession": "2026–2027",
    "permissions": [
      "admissions:*",
      "students:*",
      "attendance:*",
      "finance:*",
      "settings:*"
    ]
  }
}
```

---

### 3.2 `POST /api/v1/auth/google`
Single Sign-On authentication using Google Workspace OAuth 2.0.

- **Access**: Public
- **Rate Limit**: `10 requests / min per IP`

#### Request Payload
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY4ZGI4OGY...",
  "domain": "vidyafloww.edu.in"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "user": {
    "id": "usr_992144",
    "name": "Dr. V. Malhotra",
    "email": "principal@vidyafloww.edu.in",
    "role": "principal",
    "tenantId": "sch_springfield_delhi"
  }
}
```

---

### 3.3 `POST /api/v1/auth/register`
Provisions a new institution or preliminary campus account.

- **Access**: Public

#### Request Payload
```json
{
  "role": "admin",
  "fullName": "Dr. Rajesh Sharma",
  "email": "rajesh.s@school.edu.in",
  "phone": "+91 98765 43210",
  "schoolAffiliationCode": "CBSE-DEL-401",
  "password": "SecurePassword@2026",
  "agreedToTerms": true
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "Account initialized. 6-digit verification code dispatched.",
  "registrationId": "reg_849201",
  "otpExpiresIn": 300
}
```

---

### 3.4 `POST /api/v1/auth/otp/verify`
Validates 6-digit Multi-Factor / Registration OTP.

- **Access**: Public

#### Request Payload
```json
{
  "targetIdentifier": "admin@vidyafloww.edu.in",
  "otpCode": "948216",
  "purpose": "registration"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "verified": true,
  "actionToken": "act_tok_8492019948"
}
```

---

### 3.5 `POST /api/v1/auth/password/reset`
Sets a new encrypted password using the verified action token.

- **Access**: Public

#### Request Payload
```json
{
  "actionToken": "act_tok_8492019948",
  "newPassword": "NewSecurePassword@2027"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Password successfully updated. All active sessions invalidated."
}
```

---

### 3.6 `POST /api/v1/auth/username/lookup`
Recovers institutional User ID using verified phone & date of birth.

- **Access**: Public

#### Request Payload
```json
{
  "phone": "+91 98765 43210",
  "dob": "14 May 2011",
  "otpCode": "812954"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "matchedUser": {
    "name": "Roshan Singh",
    "username": "admin@vidyafloww.edu.in",
    "role": "Super Administrator",
    "institution": "Springfield Academy"
  }
}
```

---

### 3.7 `GET /api/v1/auth/me`
Retrieves current authenticated session profile, active session, and RBAC matrix.

- **Access**: Private (`Bearer Token Required`)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "user": {
    "id": "usr_849201",
    "name": "Roshan Singh",
    "email": "admin@vidyafloww.edu.in",
    "role": "super_admin",
    "activeSession": "2026–2027",
    "tenant": {
      "id": "sch_springfield",
      "name": "Springfield Academy",
      "cbseAffiliationNo": "1930281"
    }
  }
}
```

---

### 3.8 `POST /api/v1/auth/refresh`
Refreshes expired access token via secure HTTP-Only refresh cookie.

- **Access**: Public (Cookie Required)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.new...",
  "expiresIn": 900
}
```

---

## 4. Standard Error Response Schema

All errors conform to RFC 7807 (Problem Details for HTTP APIs):

```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "The email or password provided is incorrect.",
    "statusCode": 401,
    "timestamp": "2026-08-24T15:53:00Z",
    "path": "/api/v1/auth/login"
  }
}
```

| HTTP Code | Error Code Constant | Description |
|:---|:---|:---|
| `400 Bad Request` | `VALIDATION_FAILED` | Malformed JSON or missing required fields |
| `401 Unauthorized` | `AUTH_TOKEN_EXPIRED` | Expired or missing Bearer token |
| `403 Forbidden` | `INSUFFICIENT_PERMISSIONS` | Role lacks permission for this endpoint |
| `404 Not Found` | `RESOURCE_NOT_FOUND` | Student/Staff/Record does not exist |
| `429 Too Many Requests` | `RATE_LIMIT_EXCEEDED` | Rate limit breached — retry after indicated backoff |
| `500 Server Error` | `INTERNAL_SERVER_ERROR` | Unhandled server exception |

---

## 5. Compliance & Security Standards
- **Data Encryption**: AES-256 at rest, TLS 1.3 in transit.
- **Audit Logs**: Every authentication event and privilege escalation is immutably logged with IP, Device Fingerprint, and Geo-coordinates.
- **CBSE / NEP 2020 Compliance**: Data sovereignty within Indian cloud boundaries (MeitY-empaneled data centers).
