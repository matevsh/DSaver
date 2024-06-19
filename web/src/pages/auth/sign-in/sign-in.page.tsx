import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { paths } from "@/router/paths.ts";
import { FormAlert } from "@/components/ui/form-alert.tsx";
import { useSetAuthAlert, useSignInAlert } from "@/stores/auth-pages.store.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/components/ui/error-message.tsx";
import {
  signInFormSchema,
  SignInFormValues,
} from "@/pages/auth/sign-in/sign-in-form-schema.ts";
import { getErrorMessage } from "@/utils/get-error-message.ts";
import { useSignIn } from "@/pages/auth/sign-in/use-sign-in.ts";
import { useQueryClient } from "@tanstack/react-query";

export function SignInPage() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
  });

  const queryClient = useQueryClient();

  const [alert, closeAlert] = useSignInAlert();
  const { signIn } = useSetAuthAlert();

  function onSuccessSignIn() {
    closeAlert();
    return queryClient.invalidateQueries({
      queryKey: ["user-session"],
    });
  }

  function onErrorSignIn(error: unknown) {
    signIn.setFailedAlert(getErrorMessage(error));
  }

  const { mutate } = useSignIn(onSuccessSignIn, onErrorSignIn);

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <>
      <FormAlert alert={alert} closeAlert={closeAlert} />
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-balance text-muted-foreground">
          Enter your login below to sign in to your account
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="login">Login</Label>
            <Input
              id="login"
              placeholder="Your login..."
              {...register("login")}
            />
            <ErrorMessage error={errors.login} />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Your password..."
              {...register("password")}
            />
            <ErrorMessage error={errors.password} />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </div>
      </form>
      <div className="mt-4 text-sm">
        Don&apos;t have an account?{" "}
        <Link href={paths.auth.signUp} className="underline">
          Sign up
        </Link>
      </div>
    </>
  );
}
