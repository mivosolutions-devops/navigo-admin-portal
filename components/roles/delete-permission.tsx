"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "../ui/dialog";
import { RxCross2 } from "react-icons/rx";
import ActionModal from "../ui/globals/action-modal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Dispatch, FC, SetStateAction } from "react";
import { useMutation } from "@tanstack/react-query";
import { rolesService } from "@/services";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/get-query-client";
import { useParams } from "next/navigation";

const DeletePermission: FC<{
  roleId: string;
  permissionId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ roleId, permissionId, isOpen, setIsOpen }) => {
  const queryClient = getQueryClient();
  const params = useParams()

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      rolesService.removePermissionsFromRole(roleId, [permissionId]),
    onSuccess: () => {
      if(params.userId) {
        queryClient.invalidateQueries({ queryKey: ["users/user-id", {userId: params.userId}] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
      }
      setIsOpen(false);
      toast.success("Permission deleted from role successfully!");
    },
    onError: (error: any) => {
      if (error?.response) {
        toast.error(
          error.response.data.message ||
            error.message ||
            "Action failed, try again!",
          { position: "top-center" },
        );
      } else {
        toast.error(
          "Network error, check your internet connection and try again!",
          {
            position: "top-center",
          },
        );
      }
    },
  });

  return (
    <ActionModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"Are you sure you want to remove this permission from this role?"}
      description=""
      wrapperStyles="text-2xl font-medium items-center lg:max-w-xl"
      footerContent={
        <div className="w-full flex items-center justify-center gap-6">
          <DialogClose asChild>
            <Button
              type="button"
              className={`w-1/3 bg-gray-200 hover:bg-gray-200 text-slate-500 hover:text-slate-500 rounded-full text-sm py-4 px-6 gap-2 self-center`}
              variant={"ghost"}
            >
              <RxCross2 />
              <span>Cancel</span>
            </Button>
          </DialogClose>
          <Button
            type="button"
            className={`w-1/2 rounded-full text-sm py-4 px-6 gap-2 self-center`}
            variant="destructive"
            disabled={isPending}
            onClick={() => mutate()}
          >
            <RiDeleteBin6Line className="text-lg" />
            <span>
              {isPending ? "Deleting, please wait..." : "Delete permission"}
            </span>
          </Button>
        </div>
      }
    >
      <p className="text-center text-sm text-muted-foreground">
        Deleting this permission will permanently remove it from this role. This
        action can be undone by re-adding the permission to this role
      </p>
    </ActionModal>
  );
};

export default DeletePermission;
