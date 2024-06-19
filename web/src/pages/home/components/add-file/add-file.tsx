import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Controller, useForm } from "react-hook-form";
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
import { HardDrive } from "lucide-react";
import { DiscordIcon } from "@/components/icons/discord-icon.tsx";
import { OptionCard } from "@/pages/home/components/add-file/option-card.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher.ts";
import { responseSchema } from "@/utils/response-schema.ts";
import { objectToFormData } from "@/utils/object-to-form-data.ts";
import { toast } from "sonner";

type AddFileModalProps = {
  isOpen: boolean;
  toggle: () => void;
};

const addFileFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  channel: z.string().min(1, "Channel is required"),
  file: z
    .instanceof(FileList)
    .refine((value) => value.length > 0, "File is required")
    .transform(([value]) => value),
  cloudOrigin: z.string().min(1, "Cloud origin is required"),
});

type AddFileForm = z.infer<typeof addFileFormSchema>;

const CLOUD_ORIGINS = [
  {
    id: "hdd",
    name: "HDD",
    description: "For files smaller files, maximum 10MB",
    icon: <HardDrive height={48} width={48} />,
    disabled: true,
  },
  {
    id: "discord",
    name: "Discord",
    description: "Recommended for bigger files",
    icon: <DiscordIcon height={56} width={56} />,
  },
];

export function AddFileModal({ isOpen, toggle }: AddFileModalProps) {
  const form = useForm<AddFileForm>({
    resolver: zodResolver(addFileFormSchema),
    defaultValues: {
      name: "",
      channel: "",
      cloudOrigin: "discord",
    },
  });

  const queryClient = useQueryClient();

  const { isLoading: isChannelsLoading, data: channels } = useDiscordChannels();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AddFileForm) =>
      fetcher("/upload-file", responseSchema(), {
        body: objectToFormData(data),
        method: "POST",
      }),
    onSuccess: () => {
      toggle();
      return queryClient.invalidateQueries({
        queryKey: ["files"],
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      } else toast.error("Unknown error");
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data);
  });

  return (
    <Dialog onOpenChange={toggle} open={isOpen}>
      <DialogContent className="max-w-[350px]">
        <LoadingOverlay visible={[isChannelsLoading, isPending]} />
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>Send any type of file to cloud.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-1">
            <div className="flex flex-col">
              <Label htmlFor="name" className="pb-1.5">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name of your project"
                {...form.register("name")}
              />
              <ErrorMessage error={form.formState.errors.name} />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="file" className="pb-1.5">
                File
              </Label>
              <Input type="file" {...form.register("file")} />
              <ErrorMessage error={form.formState.errors.file} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Channel</Label>
              <Controller
                control={form.control}
                name="channel"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={field.disabled}
                  >
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {channels?.data.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessage error={form.formState.errors.channel} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Cloud origin</Label>
              <Controller
                control={form.control}
                render={({ field }) => (
                  <div className="flex gap-2">
                    {CLOUD_ORIGINS.map(
                      ({ id, name, icon, description, disabled }) => (
                        <OptionCard
                          id={id}
                          key={id}
                          icon={icon}
                          name={name}
                          description={description}
                          active={field.value === id}
                          onChange={field.onChange}
                          disabled={disabled}
                        />
                      )
                    )}
                  </div>
                )}
                name="cloudOrigin"
              />
              <ErrorMessage error={form.formState.errors.cloudOrigin} />
            </div>
          </div>
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
