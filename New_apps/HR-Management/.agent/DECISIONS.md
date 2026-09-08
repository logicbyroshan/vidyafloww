# Architectural Decisions: Operational HR & Staff Management

## ADR-001: Decoupled Standalone Subsystem
- **Status**: Accepted
- **Context**: The Operational HR & Staff Management module requires independent development, dedicated backend services, and subdomain hosting.
- **Decision**: Decouple into standalone directory `New_apps/HR-Management` with its own Vite config, base UI suite, and microservice backend.
