import { UploadIcon, UserRoundIcon } from "lucide-react";

const ICON_SIZE = 75;

export function Avatar() {
  return (
    <div className="group aspect-square w-32 flex items-center justify-center border-4 border-border rounded-lg backdrop-brightness-125 cursor-pointer">
      <UserRoundIcon size={ICON_SIZE} className="group-hover:hidden" />
      <UploadIcon size={ICON_SIZE} className="hidden group-hover:block" />
    </div>
  );
}
