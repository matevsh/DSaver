import { AlertState } from "@/stores/auth-pages.store.ts";
import { Alert } from "@/components/ui/alert.tsx";
import { XIcon } from "lucide-react";

type FormAlertProps = {
  alert: AlertState;
  closeAlert: () => void;
};

export function FormAlert({ closeAlert, alert }: FormAlertProps) {
  if (!alert) return null;

  return (
    <div className="mb-4">
      <Alert variant={alert.type} className="relative font-medium">
        {alert.message}
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={closeAlert}
        >
          <XIcon />
        </div>
      </Alert>
    </div>
  );
}
