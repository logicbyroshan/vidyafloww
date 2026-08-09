import { createRootRoute } from '@tanstack/react-router';
import { AppShell } from '../layouts/AppShell';
import * as React from 'react';
import { VFEmptyState } from '@vidyamaxx/ui';

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <AppShell />
    </React.Fragment>
  ),
  notFoundComponent: () => (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <VFEmptyState
        title="404 - Page Not Found"
        description="The page you are looking for doesn't exist or has been moved."
        primaryAction={{
          label: "Return Home",
          onClick: () => window.history.back(),
        }}
      />
    </div>
  ),
});
