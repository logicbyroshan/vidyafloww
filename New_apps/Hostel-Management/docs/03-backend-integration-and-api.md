# Backend Integration & API Specification: Hostel & Dormitory Management

## 1. Microservice Overview
- **Technology Stack**: Django REST Microservice with Celery workers for gate sync and mess billing
- **Local Port**: `8111`
- **Database**: PostgreSQL `hostel_management_db`

## 2. Core Entities
- **HostelBlock**: HostelBlock (name, code, gender_policy, warden_user_id, capacity)
- **HostelRoom**: HostelRoom (block_id, room_number, floor, max_beds, room_type, monthly_fee)
- **HostelBed**: HostelBed (room_id, bed_label, resident_student_id, allocation_date, status)
- **MessMenu**: MessMenu (day_of_week, meal_type, items_text, calories_approx, is_veg)
- **HostelOutpass**: HostelOutpass (student_id, departure_time, expected_return, actual_return, approval_status, emergency_contact)
- **NightRollCallRecord**: NightRollCallRecord (date, student_id, bed_id, status, punch_time, warden_id)

## 3. Real-Time Events
WebSocket endpoint: `ws://localhost:8111/ws/events` for live operational updates.
