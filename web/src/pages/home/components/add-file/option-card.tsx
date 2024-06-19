import { Card } from "@/components/ui/card.tsx";
import { cn } from "@/utils.ts";

type OptionCardProps = {
  id: string;
  icon: JSX.Element;
  name: string;
  description: string;
  active: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function OptionCard({
  icon,
  name,
  description,
  active,
  id,
  onChange,
  disabled,
}: OptionCardProps) {
  return (
    <Card
      className={cn(
        "p-2.5 grow aspect-square basis-1 flex flex-col",
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:scale-[0.99] transition cursor-pointer",
        active && "ring-2 ring-primary-500"
      )}
      onClick={() => !disabled && onChange(id)}
    >
      <div className="flex justify-center items-center grow">{icon}</div>
      <div className="text-center select-none">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </Card>
  );
}
