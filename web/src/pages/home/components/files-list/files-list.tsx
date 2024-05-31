import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AlertCircle, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  File,
  useFileList,
} from "@/pages/home/components/files-list/use-file-list.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { parseFileSize } from "@/utils/parse-file-size.ts";
import { formatDate } from "@/utils/format-date.ts";
import { ReactNode, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { LoadingOverlay } from "@/components/ui/loading-overlay.tsx";

const columns: ColumnDef<File>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "channelName",
    header: "Channel Name",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("channelName")}</div>;
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
      <div className="capitalize">{parseFileSize(row.getValue("size"))}</div>
    ),
  },
  {
    accessorKey: "chunkSize",
    header: "Chunk Size",
    cell: ({ row }) => (
      <div className="capitalize">
        {parseFileSize(row.getValue("chunkSize"))}
      </div>
    ),
  },
  {
    accessorKey: "chunksCount",
    header: "Chunks",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("chunksCount")}</div>
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
      <div className="capitalize">{formatDate(row.getValue("createdAt"))}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.getValue("updatedAt"))}</div>
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
];

type FilesListProps = {
  headerButton: ReactNode;
};

export function FilesList({ headerButton }: FilesListProps) {
  const [search, setSearch] = useState("");
  const { data, isError, isLoading } = useFileList(search);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isError)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    );

  return (
    <div className="w-full">
      <LoadingOverlay visible={isLoading} />
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter files..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-sm"
        />
        {headerButton}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? null : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
