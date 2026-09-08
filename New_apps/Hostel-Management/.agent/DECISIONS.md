# Architectural Decisions: Hostel & Dormitory Management

## ADR-001: Decoupled Standalone Subsystem
- **Status**: Accepted
- **Context**: The Hostel & Dormitory Management module requires independent development, dedicated backend services, and subdomain hosting.
- **Decision**: Decouple into standalone directory `New_apps/Hostel-Management` with its own Vite config, base UI suite, and microservice backend.
