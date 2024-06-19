import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { paths } from "@/router/paths.ts";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card.tsx";
import { CircleHelpIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/components/ui/error-message.tsx";
import {
  signUpFormSchema,
  SignUpFormValues,
} from "@/pages/auth/sign-up/sign-up-form-schema.ts";
import { useSignUp } from "@/pages/auth/sign-up/use-sign-up.ts";
import { useSignUpAlert, useSetAuthAlert } from "@/stores/auth-pages.store.ts";
import { getErrorMessage } from "@/utils/get-error-message.ts";
import { FormAlert } from "@/components/ui/form-alert.tsx";

export function SignUpPage() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
  });

  const [_location, navigate] = useLocation();

  const [alert, closeAlert] = useSignUpAlert();
  const { signIn, signUp } = useSetAuthAlert();

  function onSuccessSignUp() {
    navigate(paths.auth.signIn);
    signIn.setSuccessSignIn();
    closeAlert();
  }

  function onErrorSignUp(error: unknown) {
    signUp.setFailedAlert(getErrorMessage(error));
  }

  const { mutate } = useSignUp(onSuccessSignUp, onErrorSignUp);

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <>
      <FormAlert alert={alert} closeAlert={closeAlert} />
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-balance text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>
      <div>
        <form onSubmit={onSubmit} className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="login">Login</Label>
            <div>
              <Input
                id="login"
                placeholder="Your login..."
                {...register("login")}
              />
              <ErrorMessage error={errors.login} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Your password..."
              />
              <ErrorMessage error={errors.password} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="repassword">Repeat Password</Label>
            <div>
              <Input
                id="repassword"
                type="password"
                placeholder="Repeat your password..."
                {...register("repeatPassword")}
              />
              <ErrorMessage error={errors.repeatPassword} />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="invitation-code">Invitation Code</Label>
              <HoverCard>
                <HoverCardTrigger className="cursor-help hover:brightness-75">
                  <CircleHelpIcon size={16} />
                </HoverCardTrigger>
                <HoverCardContent>
                  Invitation code is required to create an account
                </HoverCardContent>
              </HoverCard>
            </div>
            <div>
              <Input
                id="invitation-code"
                type="password"
                {...register("invitationCode")}
                placeholder="Your invitation code..."
              />
              <ErrorMessage error={errors.invitationCode} />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </div>
      <div className="mt-4 text-sm">
        Already have an account?{" "}
        <Link href={paths.auth.signIn} className="underline">
          Sign in
        </Link>
      </div>
    </>
  );
}
