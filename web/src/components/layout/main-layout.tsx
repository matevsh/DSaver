import { ReactNode, useMemo } from "react";
import { Button } from "@/components/ui/button.tsx";
import { HomeIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useLocation } from "wouter";
import { paths } from "@/router/paths.ts";
import { Logo } from "@/components/layout/logo.tsx";

type LayoutButton = {
  label: string;
  onClick?: () => void;
  icon: ReactNode;
};

const ICON_SIZE = 20;

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const [_location, navigate] = useLocation();

  const mainLayoutNav = useMemo(
    (): LayoutButton[] => [
      {
        label: "Home",
        icon: <HomeIcon size={ICON_SIZE} />,
        onClick: () => navigate(paths.home),
      },
      {
        label: "Files",
        icon: <UserIcon size={ICON_SIZE} />,
        onClick: () => navigate(paths.profile),
      },
      {
        label: "Settings",
        icon: <SettingsIcon size={ICON_SIZE} />,
        onClick: () => navigate(paths.settings),
      },
    ],
    [navigate]
  );

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 m-4 flex justify-between">
        <div onClick={() => navigate(paths.home)} className="cursor-pointer">
          <Logo />
        </div>
        <div className="flex gap-2">
          {mainLayoutNav.map((button) => (
            <Button
              variant="outline"
              className="aspect-square text-3xl"
              key={button.label}
              onClick={button.onClick}
            >
              <div>{button.icon}</div>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="p-4 basis-1/2 bg-neutral-900 rounded-lg shadow-2xl relative">
          {children}
        </div>
      </div>
    </div>
  );
}
