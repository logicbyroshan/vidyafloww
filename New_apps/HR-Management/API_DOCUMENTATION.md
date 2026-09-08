# API Documentation: Operational HR & Staff Management

> Subsystem Port: **8013** · Backend Service Port: **8113**
> Production Subdomain: **https://hr.vidyafloww.com**

---

## 1. Architecture Overview
This subsystem communicates with its dedicated microservice backend (`Django REST Microservice with payroll calculation engine and biometric clock sync`).
Authentication is conducted via JWT bearer tokens shared from the VidyaFloww main portal session.

```text
[Main Portal: app.vidyafloww.com] ──(SSO / JWT)──> [Subsystem: https://hr.vidyafloww.com]
                                                            │
                                                     (REST / WebSocket)
                                                            │
                                                            ▼
                                        [Backend Microservice: Port 8113]
                                                            │
                                                     (PostgreSQL / Redis)
```

---

## 2. Core Entities
- `OperationalEmployee`: OperationalEmployee (employee_id, full_name, department, designation, salary_structure_id, date_of_joining)
- `StaffAttendanceLog`: StaffAttendanceLog (employee_id, date, punch_in_time, punch_out_time, punch_source, late_minutes)
- `StaffLeaveApplication`: StaffLeaveApplication (employee_id, leave_type, start_date, end_date, reason, status, approved_by)
- `PayrollRecord`: PayrollRecord (employee_id, month, year, base_salary, allowances, pf_deduction, esi_deduction, net_payable)
- `StaffAssetAssignment`: StaffAssetAssignment (asset_tag, employee_id, asset_type, serial_number, issue_date, return_date)

---

## 3. Endpoints Catalog

### 3.1 Health & Status
- **`GET /api/v1/health`**: Service readiness check. Returns `{ status: "healthy", timestamp: "..." }`.

### 3.2 Subsystem Resources
- **`GET /api/v1/hr-management/overview`**: Summary metrics and dashboard KPIs.
- **`GET /api/v1/hr-management/records`**: Paginated listing with filtering by date, status, or search term.
- **`POST /api/v1/hr-management/records`**: Create or allocate a new entity.
- **`PUT /api/v1/hr-management/records/:id`**: Full update of entity.
- **`PATCH /api/v1/hr-management/records/:id`**: Surgical patch of entity fields.
- **`DELETE /api/v1/hr-management/records/:id`**: Soft-delete or archive entity.

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
