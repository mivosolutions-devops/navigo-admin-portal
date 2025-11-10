/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BiUserPlus } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import ActionModal from "@/components/ui/globals/action-modal";
import { DialogClose } from "@/components/ui/dialog";
import { RxCross2 } from "react-icons/rx";
import { IoMdPersonAdd } from "react-icons/io";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { toast } from "sonner";
import { permissionsService, usersService } from "@/services";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getQueryClient } from "@/lib/get-query-client";
import PermissionsTable from "@/components/tables/PermissionsTable";
import { getNumericSearchParam } from "@/lib/utils";
import useQueryParams from "@/hooks/useQueryParams";

const Page = () => {
  const [selectedPermissions, setSelectedPermissions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = getQueryClient();
  const params = useParams()
const {searchParams} = useQueryParams()
  const selectedPage = getNumericSearchParam(searchParams, "page", 1)
  const limit = getNumericSearchParam(searchParams, "limit", 10)

  const {data: {user: inviewUser}} = useSuspenseQuery<{user: TUserData}>({
    queryKey: ["users/user-id", {userId: params.userId}],
    queryFn: () =>
      usersService.getUser(params.userId as string,
        { permissions: true, roles: true },
      ),
  })

  const onSearchPermissions = async (value: string) => {
    const allPermissions = (await queryClient.fetchQuery({
      queryKey: ["permissions", value],
      queryFn: () => permissionsService.getPermissions({ search: value }),
    })) as TPermissionsState;

    return allPermissions.items
      .filter(
        (permission) =>
          !inviewUser.permissions?.some((p) => p.id === permission.id),
      )
      .map((permission) => ({
        label: permission.slug,
        value: permission.id,
      }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      usersService.addPermissionsToUser(
        selectedPermissions.map((permission) => permission.value),
        params.userId as string,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users/user-id", params.userId] });
      setIsOpen(false);
      toast.success(
        `${selectedPermissions.length > 1 ? "Permissions" : "Permission"} added successfully!`,
      );
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Action failed, try again!",
      );
    },
  });

  const permissions = inviewUser.permissions || []

  return (
    <div className="w-[98%] flex flex-col items-center justify-center gap-8 mt-8 mb-20 ml-2">
      <div className="w-full flex justify-between">
        <div className="w-[40%] relative flex">
          <CiSearch className="absolute self-center ml-4 text-gray-800" />
          <Input
            type="text"
            className="px-4 pl-10 rounded-full text-gray-800 focus-visible:ring-emerald-500 focus:ring-emerald-500 focus-visible:ring-offset-1"
            placeholder="search for permissions"
          />
        </div>
        <div className="w-fit flex items-center justify-center gap-4">
          <ActionModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            trigger={
              <Button
                type="submit"
                size={"icon"}
                className={`w-full bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full py-6 px-5 gap-3`}
              >
                <BiUserPlus className="text-xl" />
                <span>Assign permissions</span>
              </Button>
            }
            title={"Assign permissions"}
            description=""
            wrapperStyles="text-2xl font-medium items-center lg:max-w-xl"
            footerContent={
              <div className="w-full flex items-center justify-center gap-6">
                <DialogClose asChild>
                  <Button
                    type="button"
                    className={`bg-gray-200 hover:bg-gray-200 text-slate-500 hover:text-slate-500 rounded-full text-sm py-4 px-6 gap-2 self-center`}
                    variant={"ghost"}
                  >
                    <RxCross2 />
                    <span>Cancel</span>
                  </Button>
                </DialogClose>
                  <Button
                    type="button"
                    className={`bg-emerald-500 hover:bg-emerald-500 text-white hover:text-white rounded-full text-sm py-4 px-6 gap-2 self-center`}
                    variant={"ghost"}
                    onClick={() => mutate()}
                  >
                    <IoMdPersonAdd />
                    <span>{isPending ? "Assigning, please wait..." : "Assign permissions"}</span>
                  </Button>
              </div>
            }
          >
            <MultipleSelector
              onSearch={onSearchPermissions}
              onChange={setSelectedPermissions}
              placeholder="search and select permissions"
              loadingIndicator={
                <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
                  loading...
                </p>
              }
              emptyIndicator={
                <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                  no results found.
                </p>
              }
            />
          </ActionModal>
          <Button
            type="submit"
            size={"icon"}
            className={`w-full bg-logo-gradient hover:bg-logo-gradient text-white rounded-full py-6 px-5 gap-3`}
          >
            <BiExport className="text-lg" />
            <span>Export as Excel</span>
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8 mb-10">
        <PermissionsTable
          permissions={permissions}
          selectedPage={selectedPage}
          limit={limit}
          totalPages={1}
          totalPermissions={permissions.length}
          key={permissions.length}
        />
      </div>
    </div>
  );
};

export default Page;
