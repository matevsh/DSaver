import { useUser } from "@/shared/queries/use-user/use-user.ts";
import { Avatar } from "@/pages/profile/components/avatar.tsx";
import { PencilIcon } from "lucide-react";

export function ProfilePage() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="font-semibold">
      <h1 className="text-2xl tracking-tight mb-4">Your Profile</h1>
      <div className="flex gap-4">
        <div className="grid gap-2">
          <Avatar />
        </div>
        <div className="relative">
          <p className="text-neutral-600 absolute">{user?.login}</p>
          <div className="mt-4 flex gap-2">
            <p className="text-3xl">{user?.name}</p>
            <PencilIcon className="cursor-pointer relative top-3" size={16} />
          </div>
        </div>
      </div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
