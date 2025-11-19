import { getQueryClient } from "@/lib/get-query-client";
import { permissionsService } from "@/services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import Permissions from "./permissions";

const PermissionsPage = async ({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const selectedPage = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery<TPermissionsState>({
    queryKey: ["permissions", params],
    queryFn: () =>
      permissionsService.getPermissions({ page: selectedPage, limit })
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Permissions />
    </HydrationBoundary>
  );
};

export default PermissionsPage;
