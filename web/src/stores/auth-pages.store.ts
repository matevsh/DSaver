import { create } from "zustand";

type Alert = {
  message: string;
  type: "error" | "success";
};

export type AlertState = Alert | null;

type AuthState = {
  signUpAlert: AlertState;
  signInAlert: AlertState;
};

type AuthActions = {
  setSignUpAlert: (alert: AlertState) => void;
  setSignInAlert: (alert: AlertState) => void;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  signUpAlert: null,
  signInAlert: null,
  setSignUpAlert: (alert) => set({ signUpAlert: alert }),
  setSignInAlert: (alert) => set({ signInAlert: alert }),
}));

export const useSignUpAlert = () => {
  const [alert, setAlert] = useAuthStore((state) => [
    state.signUpAlert,
    state.setSignUpAlert,
  ]);

  function closeAlert() {
    setAlert(null);
  }

  return [alert, closeAlert] as const;
};

export const useSignInAlert = () => {
  const [alert, setAlert] = useAuthStore((state) => [
    state.signInAlert,
    state.setSignInAlert,
  ]);

  function closeAlert() {
    setAlert(null);
  }

  return [alert, closeAlert] as const;
};

export const useSetAlert = () => {
  const [setSignIn, setSignUp] = useAuthStore((state) => [
    state.setSignInAlert,
    state.setSignUpAlert,
  ]);

  return {
    signUp: {
      setFailedAlert(message: string) {
        setSignUp({
          message,
          type: "error",
        });
      },
    },
    signIn: {
      setSuccessSignIn() {
        setSignIn({
          message: "You have successfully signed up",
          type: "success",
        });
      },
      setFailedAlert(message: string) {
        setSignIn({
          message,
          type: "error",
        });
      },
    },
  };
};
