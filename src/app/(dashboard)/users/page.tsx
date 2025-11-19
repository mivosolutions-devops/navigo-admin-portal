import { getQueryClient } from "@/lib/get-query-client";
import { usersService } from "@/services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import Users from "./users";

const UsersPage = async ({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const selectedPage = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery<TRolesState>({
    queryKey: ["users", params],
    queryFn: () => usersService.getUsers({ page: selectedPage, limit })
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Users />
    </HydrationBoundary>
  );
};

export default UsersPage;
