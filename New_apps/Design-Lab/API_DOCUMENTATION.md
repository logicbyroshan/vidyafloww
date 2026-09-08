# API Documentation: Design Lab Studio

> Subsystem Port: **8010** · Backend Service Port: **8110**
> Production Subdomain: **https://designlab.vidyafloww.com**

---

## 1. Architecture Overview
This subsystem communicates with its dedicated microservice backend (`FastAPI / Django REST Microservice with WeasyPrint & ReportLab vector engines`).
Authentication is conducted via JWT bearer tokens shared from the VidyaFloww main portal session.

```text
[Main Portal: app.vidyafloww.com] ──(SSO / JWT)──> [Subsystem: https://designlab.vidyafloww.com]
                                                            │
                                                     (REST / WebSocket)
                                                            │
                                                            ▼
                                        [Backend Microservice: Port 8110]
                                                            │
                                                     (PostgreSQL / Redis)
```

---

## 2. Core Entities
- `DocumentTemplate`: DocumentTemplate (dimensions, margins, DPI, header, watermark, signature slots)
- `TemplateField`: TemplateField (coordinate x, y, width, height, font_family, font_size, data_binding)
- `RenderedDocument`: RenderedDocument (hash, student_id, staff_id, generated_pdf_url, sha256_checksum)
- `CertificateBatch`: CertificateBatch (batch_code, academic_year, issue_count, signed_by)

---

## 3. Endpoints Catalog

### 3.1 Health & Status
- **`GET /api/v1/health`**: Service readiness check. Returns `{ status: "healthy", timestamp: "..." }`.

### 3.2 Subsystem Resources
- **`GET /api/v1/design-lab/overview`**: Summary metrics and dashboard KPIs.
- **`GET /api/v1/design-lab/records`**: Paginated listing with filtering by date, status, or search term.
- **`POST /api/v1/design-lab/records`**: Create or allocate a new entity.
- **`PUT /api/v1/design-lab/records/:id`**: Full update of entity.
- **`PATCH /api/v1/design-lab/records/:id`**: Surgical patch of entity fields.
- **`DELETE /api/v1/design-lab/records/:id`**: Soft-delete or archive entity.

---

## 4. Error Responses
All error responses adhere to the standard format:
```json
{
  "error": {
    "code": "ENTITY_NOT_FOUND",
    "message": "The requested resource does not exist.",
    "details": {}
  }
}
```
