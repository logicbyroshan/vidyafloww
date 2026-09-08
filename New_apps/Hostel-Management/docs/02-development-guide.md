# Standalone Development Guide: Hostel & Dormitory Management

## 1. Quick Start
```bash
# 1. Navigate to directory
cd New_apps/Hostel-Management

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm dev

# 4. Run TypeScript type check
pnpm type-check

# 5. Build production bundle
pnpm build
```

## 2. Development Modes
- **Mock Data Mode (`VITE_ENABLE_MOCK_DATA=true`)**: Runs with rich simulated in-memory records.
- **Backend Connected Mode (`VITE_ENABLE_MOCK_DATA=false`)**: Connects to the local microservice running on port `8111`.
