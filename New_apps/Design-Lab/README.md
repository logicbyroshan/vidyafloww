# Design Lab Studio — Standalone Subsystem

This folder contains the complete, standalone UI and business logic for the **VidyaFloww Design Lab**.

## Capabilities
- Marksheet & Report Card Designer
- Student & Staff Biometric ID Card Studio
- Annual Merit & Excellence Certificate Generator
- Board Examination Admit Card Studio
- Native High-Resolution PDF/PNG Export & Print Engine

## Architecture & Subdomain
- **Production Subdomain**: `https://designlab.vidyafloww.com`
- **Source Module**: `src/DesignLabModule.tsx`
- **Backend Service**: Independent Django / FastAPI microservice for document generation and batch printing.
