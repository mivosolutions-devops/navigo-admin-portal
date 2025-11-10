import React, { Dispatch, type FC, SetStateAction, useState } from "react";
import ActionModal from "../ui/globals/action-modal";
import { Button } from "../ui/button";
import { TbLockPlus } from "react-icons/tb";
import { DialogClose } from "../ui/dialog";
import { RxCross2 } from "react-icons/rx";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { useMutation } from "@tanstack/react-query";
import { permissionsService, rolesService } from "@/services";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/get-query-client";
import { useParams } from "next/navigation";

const AddPermission: FC<{
  existingPermissions: TPermission[];
  roleId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ existingPermissions, roleId, isOpen, setIsOpen }) => {
  const [selectedPermissions, setSelectedPermissions] = useState<Option[]>([]);
  const queryClient = getQueryClient();
  const params = useParams()

  const onSearchPermissions = async (value: string) => {
    const data = (await queryClient.fetchQuery({
      queryKey: ["permissions", value],
      queryFn: () => permissionsService.getPermissions({ search: value }),
    })) as TPermissionsState;

    return data.items
      .filter(
        (permission) =>
          !existingPermissions.some((p) => p.id === permission.id),
      )
      .map((permission) => ({
        label: permission.slug,
        value: permission.id,
      }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      rolesService.addPermissions(
        selectedPermissions.map((permission) => permission.value),
        roleId,
      ),
    onSuccess: () => {
      if(params.userId) {
        queryClient.invalidateQueries({ queryKey: ["users/user-id", {userId: params.userId}] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
      }
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

  return (
    <ActionModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <Button
          type="button"
          size={"sm"}
          className="bg-white hover:bg-white rounded-full p-6 text-gray-500 gap-3"
        >
          <TbLockPlus className="text-lg" />
          <span>Add permissions</span>
        </Button>
      }
      title={"Add permissions"}
      description=""
      wrapperStyles="text-2xl font-medium items-center lg:max-w-xl"
      footerContent={
        <div className="w-full flex items-center justify-center gap-6">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-gray-200 text-slate-500 rounded-full text-sm py-4 px-6 gap-2"
              variant={"ghost"}
            >
              <RxCross2 />
              <span>Cancel</span>
            </Button>
          </DialogClose>
          <Button
          type="button"
            className="rounded-full text-sm py-4 px-6 gap-2"
            variant={"default"}
            onClick={() => mutate()}
            disabled={selectedPermissions.length === 0 || isPending}
          >
            <TbLockPlus />
            <span>
              {isPending ? "Adding, please wait..." : "Add Permission"}
            </span>
          </Button>
        </div>
      }
    >
      <MultipleSelector
        onSearch={onSearchPermissions}
        onChange={setSelectedPermissions}
        placeholder="Search and select permissions"
        loadingIndicator={
          <p className="py-2 text-center text-lg">Loading...</p>
        }
        emptyIndicator={
          <p className="w-full text-center text-lg">No results found.</p>
        }
      />
    </ActionModal>
  );
};

export default AddPermission;
