# Architectural Decisions: Digital E-Library & Reading Hub

## ADR-001: Decoupled Standalone Subsystem
- **Status**: Accepted
- **Context**: The Digital E-Library & Reading Hub module requires independent development, dedicated backend services, and subdomain hosting.
- **Decision**: Decouple into standalone directory `New_apps/Library-Management` with its own Vite config, base UI suite, and microservice backend.
