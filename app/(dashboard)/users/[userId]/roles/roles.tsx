/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Role from "@/components/users/Role";
import { useState, type FC } from "react";
import { CiSearch } from "react-icons/ci";
import { BiUserPlus } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import ActionModal from "@/components/ui/globals/action-modal";
import { DialogClose } from "@/components/ui/dialog";
import { RxCross2 } from "react-icons/rx";
import { IoMdPersonAdd } from "react-icons/io";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { getQueryClient } from "@/lib/get-query-client";
import { rolesService, usersService } from "@/services";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const Roles = () => {
  const [selectedRoles, setSelectedRoles] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = getQueryClient();
  const params = useParams()

  const {data: {user: inviewUser}} = useSuspenseQuery<{user: TUserData}>({
    queryKey: ["users/user-id", {userId: params.userId}],
    queryFn: () =>
      usersService.getUser(params.userId as string,
        { permissions: true, roles: true },
      ),
  })

  const onSearchRoles = async (value: string) => {
    const allRoles = (await queryClient.fetchQuery({
      queryKey: ["roles", value],
      queryFn: () => rolesService.getRoles({ search: value }),
    })) as TRolesState;

    return allRoles.items
      .filter(
        (role) =>
          !inviewUser.roles?.some((r) => r.id === role.id),
      )
      .map((role) => ({
        label: role.name,
        value: role.id,
      }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      usersService.addRolesToUser(
        selectedRoles.map((role) => role.value),
        params.userId as string,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users/user-id", params.userId] });
      setIsOpen(false);
      toast.success(
        `${selectedRoles.length > 1 ? "Roles" : "Role"} added successfully!`,
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

  return (
    <div className="w-[98%] flex flex-col items-center justify-center gap-8 mt-8 mb-20 ml-2">
      <div className="w-full flex justify-between">
        <div className="w-[40%] relative flex">
          <CiSearch className="absolute self-center ml-4 text-gray-800" />
          <Input
            type="text"
            className="px-4 pl-10 rounded-full text-gray-800 focus-visible:ring-emerald-500 focus:ring-emerald-500 focus-visible:ring-offset-1"
            placeholder="search for roles"
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
                <span>Assign roles</span>
              </Button>
            }
            title={"Assign roles"}
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
                    disabled={isPending}
                  >
                    <IoMdPersonAdd />
                    <span>{isPending ? "Assigning roles" : "Assign roles"}</span>
                  </Button>
              </div>
            }
          >
            <MultipleSelector
              onSearch={onSearchRoles}
              onChange={setSelectedRoles}
              placeholder="search and select roles"
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
        {inviewUser.roles?.map((role) => {
          return <Role key={role.id} {...role} />;
        })}
      </div>
    </div>
  );
};

export default Roles;
