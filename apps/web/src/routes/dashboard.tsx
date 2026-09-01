import { createFileRoute } from '@tanstack/react-router';
import { DashboardPage } from './index';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});
