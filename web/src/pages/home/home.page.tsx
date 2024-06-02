import { AddFileModal } from "@/pages/home/components/add-file/add-file.tsx";
import { useState } from "react";
import { FilesList } from "@/pages/home/components/files-list/files-list.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useUser } from "@/shared/queries/use-user/use-user.ts";

type HeaderButtonProps = {
  setAddFileModalOpen: () => void;
};

function HeaderButton({ setAddFileModalOpen }: HeaderButtonProps) {
  return (
    <Button size="sm" onClick={setAddFileModalOpen}>
      Upload file
    </Button>
  );
}

export function HomePage() {
  const [addFileModalOpen, setAddFileModalOpen] = useState(false);
  const { user } = useUser();

  function toggleAddFileModal() {
    setAddFileModalOpen((prev) => !prev);
  }

  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <FilesList
        headerButton={<HeaderButton setAddFileModalOpen={toggleAddFileModal} />}
      />
      <AddFileModal isOpen={addFileModalOpen} toggle={toggleAddFileModal} />
    </>
  );
}
