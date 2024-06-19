import { AddFileModal } from "@/pages/home/components/add-file/add-file.tsx";
import { useState } from "react";
import { FilesList } from "@/pages/home/components/files-list/files-list.tsx";
import { Button } from "@/components/ui/button.tsx";

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

  function toggleAddFileModal() {
    setAddFileModalOpen((prev) => !prev);
  }

  return (
    <>
      <FilesList
        headerButton={<HeaderButton setAddFileModalOpen={toggleAddFileModal} />}
      />
      <AddFileModal isOpen={addFileModalOpen} toggle={toggleAddFileModal} />
    </>
  );
}
