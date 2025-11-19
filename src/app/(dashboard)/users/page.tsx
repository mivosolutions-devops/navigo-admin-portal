import { getQueryClient } from "@/lib/get-query-client";
import { usersService } from "@/services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { FC } from "react";
import Users from "./users";

const UsersPage: FC<{
  searchParams?: { [key: string]: string | string[] | undefined };
}> = ({ searchParams }) => {
  const selectedPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery<TRolesState>({
    queryKey: ["users", searchParams],
    queryFn: () => usersService.getUsers({ page: selectedPage, limit })
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Users />
    </HydrationBoundary>
  );
};

export default UsersPage;
