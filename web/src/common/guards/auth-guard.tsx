import { useUser } from "@/shared/queries/use-user/use-user.ts";
import { ReactNode } from "react";
import { paths } from "@/router/paths.ts";
import { Redirect } from "wouter";

type AuthGuardProps = {
  children: ReactNode;
  authRequired: boolean;
};

export function AuthGuard({ children, authRequired }: AuthGuardProps) {
  const { user, status } = useUser();

  if (status === "success") {
    if (user && !authRequired) {
      return <Redirect to={paths.home} />;
    }
    if (!user && authRequired) {
      return <Redirect to={paths.auth.signIn} />;
    }
  }

  if (authRequired && status === "error") {
    return <Redirect to={paths.auth.signIn} />;
  }

  return <>{children}</>;
}
