import { useDarkTheme } from "@/hooks/use-dark-theme.ts";
import { Providers } from "@/providers/providers.tsx";
import { PagesRouter } from "@/router/router.tsx";
import { Toaster } from "@/components/ui/sonner";

function App() {
  useDarkTheme();

  return (
    <Providers>
      <PagesRouter />
      <Toaster />
    </Providers>
  );
}

export default App;
