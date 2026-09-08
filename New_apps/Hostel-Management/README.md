# Hostel & Dormitory Management — Standalone Subsystem

This folder contains the complete, standalone UI and operational logic for the **VidyaFloww Hostel Management Subsystem**.

## Capabilities
- Rooms & Beds Occupancy Matrix with slide-over bed-by-bed allocation and vacation drawer
- 7-Day Food Timetable (Monday through Sunday with Breakfast, Lunch, and Dinner schedules)
- Campus Outpass & Leave Ledger with duration tracking and gate return status
- 09:30 PM Night Dorm Attendance Roll Call with 4-way verification toggles (Present, Absent, Late, Leave)

## Architecture & Subdomain
- **Production Subdomain**: `https://hostel.vidyafloww.com`
- **Source Module**: `src/HostelModule.tsx`
- **Backend Service**: Independent Django / FastAPI microservice managing dorm allocations, biometric gate integration, and mess billing.
