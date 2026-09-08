# Fleet & School Bus Transport Management — Standalone Subsystem

This folder contains the complete, standalone UI and tracking logic for the **VidyaFloww Transport Management Subsystem**.

## Capabilities
- Real-Time Bus Routes & Live Fleet Status (Speed, Status, Next Stop)
- Vehicle Records & Compliance (Fitness, Insurance, Fuel Type, Driver Licensing)
- Student Bus Route Allocation & Fee Tracking
- Emergency Driver & Guardian Communication Hub

## Architecture & Subdomain
- **Production Subdomain**: `https://transport.vidyafloww.com`
- **Source Module**: `src/TransportModule.tsx`
- **Backend Service**: Independent Django / FastAPI microservice with GPS telemetry ingestion and route geofencing.
