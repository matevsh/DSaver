import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ErrorMessage } from "@/components/ui/error-message.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { LoadingOverlay } from "@/components/ui/loading-overlay.tsx";
import { useDiscordChannels } from "@/pages/home/components/add-file/use-discord-channels.ts";
import { Card } from "@/components/ui/card.tsx";
import { HardDrive } from "lucide-react";
import { DiscordIcon } from "@/components/icons/discord-icon.tsx";

type AddFileModalProps = {
  isOpen: boolean;
  toggle: () => void;
};

const addFileFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  file: z
    .instanceof(FileList)
    .refine((value) => value.length > 0, "File is required"),
});

const CLOUD_ORIGINS = [
  {
    id: "hdd",
    name: "HDD",
    description: "For files smaller files, maximum 10MB",
    icon: <HardDrive height={48} width={48} />,
  },
  {
    id: "discord",
    name: "Discord",
    description: "Recommended for bigger files",
    icon: <DiscordIcon height={56} width={56} />,
  },
];

export function AddFileModal({ isOpen, toggle }: AddFileModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addFileFormSchema),
  });

  const { isLoading: isDCLoading, data: DCData } = useDiscordChannels();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Dialog onOpenChange={toggle} open={isOpen}>
      <DialogContent className="max-w-[350px]">
        <LoadingOverlay visible={[isDCLoading]} />
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>Send any type of file to cloud.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col">
          <form>
            <div className="grid w-full items-center gap-1">
              <div className="flex flex-col">
                <Label htmlFor="name" className="pb-1.5">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  {...register("name")}
                />
                <ErrorMessage error={errors.name} />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="file" className="pb-1.5">
                  File
                </Label>
                <Input type="file" {...register("file")} />
                <ErrorMessage error={errors.file} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Channel</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {DCData?.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage error={errors.file} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Cloud origin</Label>
                <div className="flex gap-2">
                  {CLOUD_ORIGINS.map(({ id, name, icon, description }) => (
                    <Card
                      key={id}
                      className="p-2.5 grow aspect-square basis-1 flex flex-col hover:scale-[0.99] transition cursor-pointer"
                    >
                      <div className="flex justify-center items-center grow">
                        {icon}
                      </div>
                      <div className="text-center select-none">
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-gray-400">{description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </form>
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                toggle();
              }}
            >
              Cancel
            </Button>
            <Button>Upload</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
