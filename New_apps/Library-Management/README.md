# Digital Library & E-Books — Standalone Subsystem

This folder contains the complete, standalone UI and catalog logic for the **VidyaFloww Library Management Subsystem**.

## Capabilities
- Digital Textbook & Reference Catalog (CBSE/NCERT/State Boards)
- In-Browser Protected PDF Reader with dark/sepia/light modes, zoom, and chapter navigation
- Physical Library Book Circulation Ledger (Issue, Return, Fine Calculations)
- Reader Analytics & Popular Subject Heatmaps

## Architecture & Subdomain
- **Production Subdomain**: `https://library.vidyafloww.com`
- **Source Module**: `src/LibraryModule.tsx`
- **Backend Service**: Independent Django / FastAPI microservice with cloud object storage for DRM-protected PDFs.
