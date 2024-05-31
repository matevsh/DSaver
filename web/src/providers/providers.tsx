import { ReactNode } from "react";
import { QueryProvider } from "@/providers/query-provider.tsx";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <QueryProvider>{children}</QueryProvider>;
}
