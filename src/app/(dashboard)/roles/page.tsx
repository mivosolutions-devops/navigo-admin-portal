import { getQueryClient } from "@/lib/get-query-client";
import { rolesService } from "@/services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import Roles from "./roles";

const RolesPage = async ({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const selectedPage = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery<TRolesState>({
    queryKey: ["roles", params],
    queryFn: () =>
      rolesService.getRoles(
        { page: selectedPage, limit },
        { permissions: true }
      )
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Roles />
    </HydrationBoundary>
  );
};

export default RolesPage;
