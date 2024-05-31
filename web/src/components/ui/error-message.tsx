import { FieldErrors } from "react-hook-form";

type Field = FieldErrors<Record<string, unknown>>[string];

export function ErrorMessage<T extends Field>({ error }: { error: T }) {
  return (
    <p className="text-red-500 min-h-[16px] text-xs pl-2">{error?.message}</p>
  );
}
