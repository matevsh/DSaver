import { useDarkTheme } from "@/hooks/use-dark-theme.ts";
import { Providers } from "@/providers/providers.tsx";
import { PagesRouter } from "@/router/router.tsx";

function App() {
  useDarkTheme();

  return (
    <Providers>
      <PagesRouter />
    </Providers>
  );
}

export default App;
