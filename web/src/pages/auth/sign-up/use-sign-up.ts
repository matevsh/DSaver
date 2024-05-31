import { useMutation } from "@tanstack/react-query";
import {
  SignUpFormValues,
  signUpMutationResponseSchema,
} from "@/pages/auth/sign-up/sign-up-form-schema.ts";
import { fetcher } from "@/utils/fetcher.ts";

export function useSignUp(onSuccess: () => void) {
  return useMutation({
    mutationFn: (data: SignUpFormValues) =>
      fetcher("/auth/sign-up", signUpMutationResponseSchema, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST",
      }),
    onSuccess,
  });
}
