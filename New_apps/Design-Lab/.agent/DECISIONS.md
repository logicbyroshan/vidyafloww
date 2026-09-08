# Architectural Decisions: Design Lab Studio

## ADR-001: Decoupled Standalone Subsystem
- **Status**: Accepted
- **Context**: The Design Lab Studio module requires independent development, dedicated backend services, and subdomain hosting.
- **Decision**: Decouple into standalone directory `New_apps/Design-Lab` with its own Vite config, base UI suite, and microservice backend.
