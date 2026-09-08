# API Documentation: Hostel & Dormitory Management

> Subsystem Port: **8011** · Backend Service Port: **8111**
> Production Subdomain: **https://hostel.vidyafloww.com**

---

## 1. Architecture Overview
This subsystem communicates with its dedicated microservice backend (`Django REST Microservice with Celery workers for gate sync and mess billing`).
Authentication is conducted via JWT bearer tokens shared from the VidyaFloww main portal session.

```text
[Main Portal: app.vidyafloww.com] ──(SSO / JWT)──> [Subsystem: https://hostel.vidyafloww.com]
                                                            │
                                                     (REST / WebSocket)
                                                            │
                                                            ▼
                                        [Backend Microservice: Port 8111]
                                                            │
                                                     (PostgreSQL / Redis)
```

---

## 2. Core Entities
- `HostelBlock`: HostelBlock (name, code, gender_policy, warden_user_id, capacity)
- `HostelRoom`: HostelRoom (block_id, room_number, floor, max_beds, room_type, monthly_fee)
- `HostelBed`: HostelBed (room_id, bed_label, resident_student_id, allocation_date, status)
- `MessMenu`: MessMenu (day_of_week, meal_type, items_text, calories_approx, is_veg)
- `HostelOutpass`: HostelOutpass (student_id, departure_time, expected_return, actual_return, approval_status, emergency_contact)
- `NightRollCallRecord`: NightRollCallRecord (date, student_id, bed_id, status, punch_time, warden_id)

---

## 3. Endpoints Catalog

### 3.1 Health & Status
- **`GET /api/v1/health`**: Service readiness check. Returns `{ status: "healthy", timestamp: "..." }`.

### 3.2 Subsystem Resources
- **`GET /api/v1/hostel-management/overview`**: Summary metrics and dashboard KPIs.
- **`GET /api/v1/hostel-management/records`**: Paginated listing with filtering by date, status, or search term.
- **`POST /api/v1/hostel-management/records`**: Create or allocate a new entity.
- **`PUT /api/v1/hostel-management/records/:id`**: Full update of entity.
- **`PATCH /api/v1/hostel-management/records/:id`**: Surgical patch of entity fields.
- **`DELETE /api/v1/hostel-management/records/:id`**: Soft-delete or archive entity.

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
