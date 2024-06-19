import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher.ts";
import { responseSchema } from "@/utils/response-schema.ts";
import { useSetAuthAlert } from "@/stores/auth-pages.store.ts";

const logoutResponse = responseSchema();

export function useLogout() {
  const queryClient = useQueryClient();
  const { signIn } = useSetAuthAlert();

  return useMutation({
    mutationFn: () => fetcher("/auth/logout", logoutResponse),
    onSuccess: () => {
      signIn.setSuccessLogout();
      return queryClient.invalidateQueries({
        queryKey: ["user-session"],
      });
    },
  });
}
