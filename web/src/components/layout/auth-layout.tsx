import { Logo } from "@/components/layout/logo.tsx";
import { ParentNode } from "@/types/parent-node.ts";
import { Snowfall } from "react-snowfall";

type AuthLayoutProps = ParentNode;

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 relative h-full">
        <div className="absolute top-0 left-0 m-4">
          <Logo />
        </div>
        <div className="mx-auto grid w-[350px] gap-6">{children}</div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <div className="absolute z-[2] top-0 left-0 w-full h-full bg-gradient-to-r from-background to-transparent from-5% to-20%" />
        <div className="absolute z-[1] top-0 left-0 w-full h-full opacity-25">
          <Snowfall
            snowflakeCount={100}
            radius={[0.1, 0.3]}
            wind={[0, 0.5]}
            speed={[0, 0.5]}
          />
        </div>
        <img
          src="/images/auth-screen.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
