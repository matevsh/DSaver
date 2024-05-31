import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { paths } from "@/router/paths.ts";

export function SignInPage() {
  return (
    <>
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-balance text-muted-foreground">
          Enter your login below to sign in to your account
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="login">Login</Label>
          <Input id="login" placeholder="Your login..." required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder="Your password..."
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="mt-4 text-sm">
        Don&apos;t have an account?{" "}
        <Link href={paths.auth.signUp} className="underline">
          Sign up
        </Link>
      </div>
    </>
  );
}
