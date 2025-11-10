"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/ui/globals/form-field";
import { UpdatePermissionFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { IoMdPersonAdd } from "react-icons/io";
import { DialogClose } from "../ui/dialog";
import { RxCross2 } from "react-icons/rx";
import ActionModal from "../ui/globals/action-modal";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { permissionsService } from "@/services";
import { getQueryClient } from "@/lib/get-query-client";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const UpdatePermission: FC<
  TPermission & {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  }
> = ({ description, id, slug, isOpen, setIsOpen }) => {
  const form = useForm<z.infer<typeof UpdatePermissionFormSchema>>({
    resolver: zodResolver(UpdatePermissionFormSchema),
    defaultValues: {
      slug,
      description,
    },
  });

  const params = useParams()
  const queryClient = getQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof UpdatePermissionFormSchema>) => {
      return permissionsService.updatePermission(id, data);
    },
    onSuccess: () => {
      if(params.userId) {
        queryClient.invalidateQueries({ queryKey: ["users/user-id", {userId: params.userId}] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["permissions"] });
      }
      setIsOpen(false);
      toast.success("Permission updated successfully!");
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
      title={"Update permission"}
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
            form="update-permission-form"
            type="submit"
            className={`w-1/2 rounded-full text-sm py-4 px-6 gap-2 self-center`}
            disabled={isPending}
          >
            <IoMdPersonAdd />
            <span>
              {isPending ? "Updating, please wait..." : "Update permission"}
            </span>
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id="update-permission-form"
          onSubmit={form.handleSubmit((data) => {
            console.log(data);
            return mutate(data);
          })}
          className="w-full flex flex-col items-center justify-center gap-4"
        >
          <CustomFormField
            name="slug"
            inputStyles="text-base"
            control={form.control}
            label="Permission name (slug)"
            placeholder="eg: update.users"
            labelStyles="text-gray-400"
            type="text"
            variant="filled"
          />
          <CustomFormField
            name="description"
            inputStyles="text-base"
            control={form.control}
            label="Permission description"
            placeholder="eg: updates a certain permission"
            labelStyles="text-gray-400"
            type="text"
            variant="filled"
          />
        </form>
      </Form>
    </ActionModal>
  );
};

export default UpdatePermission;
