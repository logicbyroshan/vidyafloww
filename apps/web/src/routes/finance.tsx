import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/finance')({
  component: FinanceRedirectPage,
});

function FinanceRedirectPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate({ to: '/fees' });
  }, [navigate]);

  return null;
}
