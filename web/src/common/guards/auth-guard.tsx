import { useUser } from "@/shared/queries/use-user/use-user.ts";
import { ReactNode } from "react";
import { useNavigate } from "@/hooks/use-navigate.ts";
import { paths } from "@/router/paths.ts";

type AuthGuardProps = {
  children: ReactNode;
  authRequired: boolean;
};

export function AuthGuard({ children, authRequired }: AuthGuardProps) {
  const { user, status } = useUser();

  console.log(user, status, authRequired);

  const { navigate } = useNavigate();

  if (status === "success") {
    if (user && !authRequired) navigate(paths.home);
    if (!user && authRequired) navigate(paths.auth.signIn);
  }

  if (status === "error") {
    navigate(paths.auth.signIn);
  }

  return <>{children}</>;
}
