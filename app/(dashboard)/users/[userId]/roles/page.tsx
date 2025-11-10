import { getQueryClient } from "@/lib/get-query-client";
import { usersService } from "@/services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { FC } from "react";
import Roles from "./roles";

const RolesPage: FC<{
  params: { userId: string }
}> = ({ params: {userId} }) => {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery<{user: TUserData}>({
    queryKey: ["users/user-id", userId],
    queryFn: () =>
      usersService.getUser(userId,
        { permissions: true, roles: true },
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Roles />
    </HydrationBoundary>
  );
};

export default RolesPage;
