import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { ReactNode } from "react";
import { Link } from "wouter";
import { paths } from "@/router/paths.ts";
import { useLogout } from "@/components/layout/main-layout/hooks/use-logout.ts";

type ProfileDropdownProps = {
  children: ReactNode;
};

export function ProfileDropdown({ children }: ProfileDropdownProps) {
  const logout = useLogout();

  function handleLogout() {
    logout.mutate();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={paths.profile}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
