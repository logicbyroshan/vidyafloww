import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useGlobalStore } from '../stores/globalStore';

export const Route = createFileRoute('/ai')({
  component: AIPage,
});

function AIPage() {
  const navigate = useNavigate();
  const { setIsAiChatOpen } = useGlobalStore();

  React.useEffect(() => {
    // Open Global AI Assistant Drawer & Redirect to Dashboard Command Center
    setIsAiChatOpen(true);
    navigate({ to: '/' });
  }, [navigate, setIsAiChatOpen]);

  return null;
}
