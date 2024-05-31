import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";
import { useFileList } from "@/pages/home/components/files-list/use-file-list.ts";

export function ProfilePage() {
  const [search, setSearch] = useState("");

  const { data } = useFileList(search);

  return (
    <div>
      <h1>Profile</h1>
      <Input
        placeholder="Filter files..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="max-w-sm"
      />
      {data?.map((file) => (
        <div key={file.id}>
          <h2>{file.name}</h2>
          <p>{file.size}</p>
        </div>
      ))}
    </div>
  );
}
