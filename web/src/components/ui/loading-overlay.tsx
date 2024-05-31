import { LoaderCircle } from "lucide-react";

type LoadingOverlayProps = {
  visible?: boolean | boolean[];
};

export function LoadingOverlay({ visible = true }: LoadingOverlayProps) {
  const isVisible = Array.isArray(visible) ? visible.some(Boolean) : visible;

  if (!isVisible) return null;

  return (
    <div className="absolute w-full h-full z-[1] flex items-center justify-center backdrop-blur-3xl transition-all top-0 left-0 overflow-hidden">
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
