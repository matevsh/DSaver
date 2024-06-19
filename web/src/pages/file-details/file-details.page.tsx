import { Link, useParams } from "wouter";
import { useFileDetails } from "@/pages/file-details/use-file-details.ts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { paths } from "@/router/paths.ts";
import { HardDriveDownloadIcon } from "lucide-react";
import { ENV } from "@/common/env.ts";

export function FileDetailsPage() {
  const { id } = useParams();

  const { data, isLoading } = useFileDetails(id);

  if (isLoading) return <div>Loading...</div>;

  if (!id)
    return (
      <div>
        <h1>File not found</h1>
      </div>
    );

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={paths.home}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data?.data?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between">
        <div className="group aspect-square w-32 flex items-center justify-center border-4 border-border rounded-lg backdrop-brightness-125 cursor-pointer">
          <p className="uppercase font-bold tracking-widest">
            {data?.data.ext}
          </p>
        </div>
        <div>
          <a href={`${ENV.VITE_API_HOST}/decode/${id}`}>
            <div className="group aspect-square w-12 flex items-center justify-center border-2 border-border rounded-lg backdrop-brightness-125 cursor-pointer group">
              <p className="uppercase font-bold tracking-widest group-hover:scale-110 transition">
                <HardDriveDownloadIcon />
              </p>
            </div>
          </a>
        </div>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
