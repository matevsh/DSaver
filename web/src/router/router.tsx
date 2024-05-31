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

type Route = {
  path: string;
  component: FC;
  layout?: boolean | FC<ParentNode>;
};

const DefaultLayout = MainLayout;

const routes: Route[] = [
  {
    path: paths.home,
    component: HomePage,
  },
  {
    path: paths.profile,
    component: ProfilePage,
  },
  {
    path: paths.settings,
    component: SettingsPage,
  },
  {
    path: paths.auth.signIn,
    component: SignInPage,
    layout: AuthLayout,
  },
  {
    path: paths.auth.signUp,
    component: SignUpPage,
    layout: AuthLayout,
  },
];

export function PagesRouter() {
  return (
    <Router>
      <Switch>
        {routes.map(({ path, component, layout = true }) => {
          const Page = component;
          let Layout: FC<ParentNode> = DefaultLayout;

          if (typeof layout === "function") Layout = layout;

          return (
            <Route key={path} path={path}>
              {layout ? (
                <Layout>
                  <Page />
                </Layout>
              ) : (
                <Page />
              )}
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}
