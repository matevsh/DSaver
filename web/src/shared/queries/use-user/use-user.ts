import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher.ts";
import { userSessionSchema } from "@/shared/queries/use-user/user.schema.ts";
import { ROLE } from "@/shared/enums/role.enum.ts";

export function useUser() {
  const { data, status, isLoading } = useQuery({
    queryKey: ["user-session"],
    queryFn: () => fetcher("/auth/session", userSessionSchema),
    refetchOnWindowFocus: true,
    refetchOnMount: false,
  });

  const user = data?.data;

  return { user, isAdmin: user?.role === ROLE.ADMIN, status, isLoading };
}
