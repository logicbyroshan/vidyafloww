# API Documentation: Digital E-Library & Reading Hub

> Subsystem Port: **8014** · Backend Service Port: **8114**
> Production Subdomain: **https://library.vidyafloww.com**

---

## 1. Architecture Overview
This subsystem communicates with its dedicated microservice backend (`FastAPI / Django REST with S3 presigned URLs for DRM PDF streaming`).
Authentication is conducted via JWT bearer tokens shared from the VidyaFloww main portal session.

```text
[Main Portal: app.vidyafloww.com] ──(SSO / JWT)──> [Subsystem: https://library.vidyafloww.com]
                                                            │
                                                     (REST / WebSocket)
                                                            │
                                                            ▼
                                        [Backend Microservice: Port 8114]
                                                            │
                                                     (PostgreSQL / Redis)
```

---

## 2. Core Entities
- `LibraryBook`: LibraryBook (isbn, title, author, publisher, publication_year, total_copies, available_copies, shelf_location)
- `EBookResource`: EBookResource (title, grade_level, subject, publisher, pdf_storage_url, file_size_bytes, drm_restricted)
- `BookIssueRecord`: BookIssueRecord (book_id, student_id_or_staff_id, issue_date, due_date, return_date, fine_amount, status)
- `LibraryMember`: LibraryMember (user_id, member_type, max_borrow_limit, active_issues_count, penalty_balance)

---

## 3. Endpoints Catalog

### 3.1 Health & Status
- **`GET /api/v1/health`**: Service readiness check. Returns `{ status: "healthy", timestamp: "..." }`.

### 3.2 Subsystem Resources
- **`GET /api/v1/library-management/overview`**: Summary metrics and dashboard KPIs.
- **`GET /api/v1/library-management/records`**: Paginated listing with filtering by date, status, or search term.
- **`POST /api/v1/library-management/records`**: Create or allocate a new entity.
- **`PUT /api/v1/library-management/records/:id`**: Full update of entity.
- **`PATCH /api/v1/library-management/records/:id`**: Surgical patch of entity fields.
- **`DELETE /api/v1/library-management/records/:id`**: Soft-delete or archive entity.

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
