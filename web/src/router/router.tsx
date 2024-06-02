import { Route, Router, Switch } from "wouter";
import { HomePage } from "@/pages/home/home.page.tsx";
import { SettingsPage } from "@/pages/settings/settings.page.tsx";
import { ProfilePage } from "@/pages/profile/profie.page.tsx";
import { paths } from "@/router/paths.ts";
import { SignInPage } from "@/pages/auth/sign-in/sign-in.page.tsx";
import { MainLayout } from "@/components/layout/main-layout.tsx";
import { FC } from "react";
import { AuthLayout } from "@/components/layout/auth-layout.tsx";
import { ParentNode } from "@/types/parent-node.ts";
import { SignUpPage } from "@/pages/auth/sign-up/sign-up.page.tsx";
import { AuthGuard } from "@/common/guards/auth-guard.tsx";

type Route = {
  path: string;
  component: FC;
  layout?: boolean | FC<ParentNode>;
  authRequired: boolean;
};

const DefaultLayout = MainLayout;

const routes: Route[] = [
  {
    path: paths.home,
    component: HomePage,
    authRequired: true,
  },
  {
    path: paths.profile,
    component: ProfilePage,
    authRequired: true,
  },
  {
    path: paths.settings,
    component: SettingsPage,
    authRequired: true,
  },
  {
    path: paths.auth.signIn,
    component: SignInPage,
    layout: AuthLayout,
    authRequired: false,
  },
  {
    path: paths.auth.signUp,
    component: SignUpPage,
    layout: AuthLayout,
    authRequired: false,
  },
];

export function PagesRouter() {
  return (
    <Router>
      <Switch>
        {routes.map(({ path, component, layout = true, authRequired }) => {
          const Page = component;
          let Layout: FC<ParentNode> = DefaultLayout;

          if (typeof layout === "function") Layout = layout;

          return (
            <Route key={path} path={path}>
              <AuthGuard authRequired={authRequired}>
                {layout ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Page />
                )}
              </AuthGuard>
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}
