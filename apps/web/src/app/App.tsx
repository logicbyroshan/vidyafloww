import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import { Preloader } from '../components/Preloader';
import { useGlobalStore, initTheme } from '../stores/globalStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const router = createRouter({ routeTree, context: { queryClient } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function AppInner(): React.JSX.Element {
  const { hasSeenPreloader } = useGlobalStore();
  const [preloaderDone, setPreloaderDone] = React.useState(hasSeenPreloader);

  // Always force dark on mount
  React.useEffect(() => {
    initTheme();
  }, []);

  if (!preloaderDone) {
    return <Preloader onDone={() => setPreloaderDone(true)} />;
  }

  return <RouterProvider router={router} />;
}

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}

export default App;
