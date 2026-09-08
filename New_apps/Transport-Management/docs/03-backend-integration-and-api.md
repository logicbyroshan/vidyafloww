# Backend Integration & API Specification: Fleet & Transport Management

## 1. Microservice Overview
- **Technology Stack**: FastAPI telemetry ingestion service with Redis Streams and PostgreSQL PostGIS
- **Local Port**: `8112`
- **Database**: PostgreSQL `transport_management_db`

## 2. Core Entities
- **FleetVehicle**: FleetVehicle (registration_number, chassis_number, capacity, model, fitness_expiry, insurance_expiry)
- **BusRoute**: BusRoute (route_name, start_point, end_point, total_distance_km, morning_departure, evening_departure)
- **BusStop**: BusStop (route_id, stop_name, sequence_order, latitude, longitude, scheduled_pickup_time)
- **StudentTransportAllocation**: StudentTransportAllocation (student_id, route_id, pickup_stop_id, drop_stop_id, fee_amount)
- **DriverStaff**: DriverStaff (staff_id, driving_license_number, license_expiry, police_verification_status)
- **GpsTelemetryPing**: GpsTelemetryPing (vehicle_id, latitude, longitude, speed_kmh, heading_deg, timestamp)

## 3. Real-Time Events
WebSocket endpoint: `ws://localhost:8112/ws/events` for live operational updates.
