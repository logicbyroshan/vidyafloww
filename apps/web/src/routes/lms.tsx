import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/lms')({
  component: LmsPage,
});

function LmsPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate({ to: '/learning' });
  }, [navigate]);

  return null;
}
