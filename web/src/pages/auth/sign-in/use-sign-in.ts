import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher.ts";
import {
  SignInFormValues,
  signInMutationResponseSchema,
} from "@/pages/auth/sign-in/sign-in-form-schema.ts";

export function useSignIn(
  onSuccess: () => void,
  onError: (err: unknown) => void
) {
  return useMutation({
    mutationFn: (data: SignInFormValues) =>
      fetcher("/auth/sign-in", signInMutationResponseSchema, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST",
      }),
    onSuccess,
    onError,
  });
}
