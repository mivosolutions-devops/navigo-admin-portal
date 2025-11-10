import { getQueryClient } from "@/lib/get-query-client";
import { permissionsService } from "@/services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { FC } from "react";
import Permissions from "./permissions";

const PermissionsPage: FC<{
  searchParams?: { [key: string]: string | string[] | undefined };
}> = ({ searchParams }) => {
  const selectedPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery<TPermissionsState>({
    queryKey: ["permissions", searchParams],
    queryFn: () =>
      permissionsService.getPermissions({ page: selectedPage, limit }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Permissions />
    </HydrationBoundary>
  );
};

export default PermissionsPage;
