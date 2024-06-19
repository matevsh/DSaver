import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge.tsx";
import { parseFileSize } from "@/utils/parse-file-size.ts";
import { formatDate } from "@/utils/format-date.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MoreHorizontal } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "@/hooks/use-navigate.ts";
import { FileSchema } from "@/shared/schema/file-schema.ts";

export function useFilesTableColumns() {
  const { navigate } = useNavigate();

  return useMemo(
    (): ColumnDef<FileSchema>[] => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const productId = row.original.id;

          return (
            <div
              className="capitalize truncate cursor-pointer"
              onClick={() => navigate(`/file/${productId}`)}
            >
              {row.getValue("name")}
            </div>
          );
        },
      },
      {
        accessorKey: "channelName",
        header: "Channel Name",
        cell: ({ row }) => {
          return (
            <div className="capitalize">{row.getValue("channelName")}</div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: () => (
          <div className="capitalize">
            <Badge color={"green"}>UPLOADED</Badge>
          </div>
        ),
      },
      {
        accessorKey: "size",
        header: "Size",
        cell: ({ row }) => (
          <div className="capitalize">
            {parseFileSize(row.getValue("size"))}
          </div>
        ),
      },
      {
        accessorKey: "ext",
        header: "Ext",
        cell: ({ row }) => (
          <div className="capitalize">
            <Badge variant="secondary" color={"green"} className="uppercase">
              {row.getValue("ext")}
            </Badge>
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => (
          <div className="capitalize">
            {formatDate(row.getValue("createdAt"))}
          </div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const payment = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [navigate]
  );
}
