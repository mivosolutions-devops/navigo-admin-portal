"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "../ui/dialog";
import { RxCross2 } from "react-icons/rx";
import ActionModal from "../ui/globals/action-modal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rolesService } from "@/services";
import { getQueryClient } from "@/lib/get-query-client";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const DeleteRole: FC<{
  roleId: string;
}> = ({ roleId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = getQueryClient();
  const params = useParams()
  const { mutate, isPending } = useMutation({
    mutationFn: () => rolesService.deleteRole(roleId),
    onSuccess: () => {
      if(params.userId) {
        queryClient.invalidateQueries({ queryKey: ["users/user-id", {userId: params.userId}] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
      }
      setIsOpen(false);
      toast.success("Role deleted successfully!");
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
      trigger={
        <Button
          type="button"
          size={"sm"}
          className="bg-white hover:bg-white rounded-full p-6 text-gray-500 gap-3"
        >
          <RiDeleteBin6Line className="text-lg" />
          <span>Remove</span>
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"Are you sure you want to remove this role ?"}
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
              {isPending ? "Deleting, please wait..." : "Delete role"}
            </span>
          </Button>
        </div>
      }
    >
      <p className="text-center text-sm text-muted-foreground">
        Deleting this role will permanently remove it from this system. This
        action can be undone by re-creating a new role similar to this one.
      </p>
    </ActionModal>
  );
};

export default DeleteRole;
