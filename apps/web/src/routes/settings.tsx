import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate({ to: '/administration' });
  }, [navigate]);

  return null;
}
