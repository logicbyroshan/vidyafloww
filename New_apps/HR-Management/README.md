# Operational HR & Staff Management — Standalone Subsystem

This folder contains the complete, standalone UI and workforce administration logic for the **VidyaFloww HR Management Subsystem**.

## Capabilities
- Non-Teaching Staff Operations & Roster (Security, Housekeeping, Transport, Lab Techs, Wardens)
- 360-Degree Staff Dossier Drawer with biometric punch logs and monthly attendance rates
- Asset Allocation & Handover Management (Radios, Uniforms, ID Badges, Keys)
- Monthly Salary Slip Generation, Native PDF/Zip Document Export Bundle

## Architecture & Subdomain
- **Production Subdomain**: `https://hr.vidyafloww.com`
- **Source Module**: `src/HRManagementModule.tsx`
- **Backend Service**: Independent Django / FastAPI microservice with payroll engine and biometric attendance clocking.
