import { getQueryClient } from "@/lib/get-query-client";
import { rolesService } from "@/services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { FC } from "react";
import Roles from "./roles";

const RolesPage: FC<{
  searchParams?: { [key: string]: string | string[] | undefined };
}> = ({ searchParams }) => {
  const selectedPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery<TRolesState>({
    queryKey: ["roles", searchParams],
    queryFn: () =>
      rolesService.getRoles(
        { page: selectedPage, limit },
        { permissions: true },
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Roles />
    </HydrationBoundary>
  );
};

export default RolesPage;
