import { getQueryClient } from "@/lib/get-query-client";
import { usersService } from "@/services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import Roles from "./roles";

const RolesPage = async ({
  params
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const queryClient = getQueryClient();

  queryClient.prefetchQuery<{ user: TUserData }>({
    queryKey: ["users/user-id", userId],
    queryFn: () =>
      usersService.getUser(userId, { permissions: true, roles: true })
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Roles />
    </HydrationBoundary>
  );
};

export default RolesPage;
