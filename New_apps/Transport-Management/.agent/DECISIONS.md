# Architectural Decisions: Fleet & Transport Management

## ADR-001: Decoupled Standalone Subsystem
- **Status**: Accepted
- **Context**: The Fleet & Transport Management module requires independent development, dedicated backend services, and subdomain hosting.
- **Decision**: Decouple into standalone directory `New_apps/Transport-Management` with its own Vite config, base UI suite, and microservice backend.
