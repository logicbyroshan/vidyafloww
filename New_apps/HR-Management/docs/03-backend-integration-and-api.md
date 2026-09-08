# Backend Integration & API Specification: Operational HR & Staff Management

## 1. Microservice Overview
- **Technology Stack**: Django REST Microservice with payroll calculation engine and biometric clock sync
- **Local Port**: `8113`
- **Database**: PostgreSQL `hr_management_db`

## 2. Core Entities
- **OperationalEmployee**: OperationalEmployee (employee_id, full_name, department, designation, salary_structure_id, date_of_joining)
- **StaffAttendanceLog**: StaffAttendanceLog (employee_id, date, punch_in_time, punch_out_time, punch_source, late_minutes)
- **StaffLeaveApplication**: StaffLeaveApplication (employee_id, leave_type, start_date, end_date, reason, status, approved_by)
- **PayrollRecord**: PayrollRecord (employee_id, month, year, base_salary, allowances, pf_deduction, esi_deduction, net_payable)
- **StaffAssetAssignment**: StaffAssetAssignment (asset_tag, employee_id, asset_type, serial_number, issue_date, return_date)

## 3. Real-Time Events
WebSocket endpoint: `ws://localhost:8113/ws/events` for live operational updates.
