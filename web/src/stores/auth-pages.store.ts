import { create } from "zustand";

type Alert = {
  message: string;
  type: "error" | "success";
};

type AlertState = Alert | null;

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

export const useSetSignInAlert = () => {
  const setSignInAlert = useAuthStore((state) => state.setSignInAlert);

  return {
    setSuccessSignUpAlert() {
      setSignInAlert({
        message: "You have successfully signed up",
        type: "success",
      });
    },
  };
};
