# API Documentation: Fleet & Transport Management

> Subsystem Port: **8012** · Backend Service Port: **8112**
> Production Subdomain: **https://transport.vidyafloww.com**

---

## 1. Architecture Overview
This subsystem communicates with its dedicated microservice backend (`FastAPI telemetry ingestion service with Redis Streams and PostgreSQL PostGIS`).
Authentication is conducted via JWT bearer tokens shared from the VidyaFloww main portal session.

```text
[Main Portal: app.vidyafloww.com] ──(SSO / JWT)──> [Subsystem: https://transport.vidyafloww.com]
                                                            │
                                                     (REST / WebSocket)
                                                            │
                                                            ▼
                                        [Backend Microservice: Port 8112]
                                                            │
                                                     (PostgreSQL / Redis)
```

---

## 2. Core Entities
- `FleetVehicle`: FleetVehicle (registration_number, chassis_number, capacity, model, fitness_expiry, insurance_expiry)
- `BusRoute`: BusRoute (route_name, start_point, end_point, total_distance_km, morning_departure, evening_departure)
- `BusStop`: BusStop (route_id, stop_name, sequence_order, latitude, longitude, scheduled_pickup_time)
- `StudentTransportAllocation`: StudentTransportAllocation (student_id, route_id, pickup_stop_id, drop_stop_id, fee_amount)
- `DriverStaff`: DriverStaff (staff_id, driving_license_number, license_expiry, police_verification_status)
- `GpsTelemetryPing`: GpsTelemetryPing (vehicle_id, latitude, longitude, speed_kmh, heading_deg, timestamp)

---

## 3. Endpoints Catalog

### 3.1 Health & Status
- **`GET /api/v1/health`**: Service readiness check. Returns `{ status: "healthy", timestamp: "..." }`.

### 3.2 Subsystem Resources
- **`GET /api/v1/transport-management/overview`**: Summary metrics and dashboard KPIs.
- **`GET /api/v1/transport-management/records`**: Paginated listing with filtering by date, status, or search term.
- **`POST /api/v1/transport-management/records`**: Create or allocate a new entity.
- **`PUT /api/v1/transport-management/records/:id`**: Full update of entity.
- **`PATCH /api/v1/transport-management/records/:id`**: Surgical patch of entity fields.
- **`DELETE /api/v1/transport-management/records/:id`**: Soft-delete or archive entity.

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
