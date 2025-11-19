"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/ui/globals/form-field";
import { PermissionFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { IoMdPersonAdd } from "react-icons/io";
import { DialogClose } from "../ui/dialog";
import { RxCross2 } from "react-icons/rx";
import { BiUserPlus } from "react-icons/bi";
import ActionModal from "../ui/globals/action-modal";
import { useState } from "react";
import { toast } from "sonner";
import { permissionsService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";

const CreatePermission = () => {
  const form = useForm<z.infer<typeof PermissionFormSchema>>({
    resolver: zodResolver(PermissionFormSchema),
    defaultValues: {
      slug: "",
      description: ""
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  const queryClient = getQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof PermissionFormSchema>) =>
      permissionsService.createPermission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      setIsOpen(false);
      form.reset();
      toast.success("permission created successfully!", {
        position: "top-center"
      });
    },
    onError: (error: any) => {
      if (error?.response) {
        toast.error(
          error.response.data.message ||
            error.message ||
            "Action failed, try again!",
          { position: "top-center" }
        );
      } else {
        toast.error(
          "Network error, check your internet connection and try again!",
          {
            position: "top-center"
          }
        );
      }
    }
  });

  return (
    <ActionModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <Button
          type='submit'
          size={"icon"}
          className={`w-full bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full py-6 px-5 gap-3`}
        >
          <BiUserPlus className='text-xl' />
          <span>create new permission</span>
        </Button>
      }
      title={"Create a new permission"}
      description=''
      wrapperStyles='text-2xl font-medium items-center lg:max-w-xl'
      footerContent={
        <div className='w-full flex items-center justify-center gap-6'>
          <DialogClose asChild>
            <Button
              type='button'
              className={`w-1/3 bg-gray-200 hover:bg-gray-200 text-slate-500 hover:text-slate-500 rounded-full text-sm py-4 px-6 gap-2 self-center`}
              variant={"ghost"}
            >
              <RxCross2 />
              <span>Cancel</span>
            </Button>
          </DialogClose>
          <Button
            form='create-permission-form'
            type='submit'
            className={`w-1/2 bg-emerald-500 hover:bg-emerald-500 text-white hover:text-white rounded-full text-sm py-4 px-6 gap-2 self-center`}
            variant={"ghost"}
            disabled={isPending}
          >
            <IoMdPersonAdd />
            <span>
              {isPending ? "Creating, please wait..." : "Create permission"}
            </span>
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          id='create-permission-form'
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className='w-full flex flex-col items-center justify-center gap-4'
        >
          <CustomFormField
            name='slug'
            inputStyles='text-base'
            control={form.control}
            label='Permission name (slug)'
            placeholder='eg: update.users'
            labelStyles='text-gray-400'
            type='text'
            variant='filled'
          />
          <CustomFormField
            name='description'
            inputStyles='text-base'
            control={form.control}
            label='Permission description'
            placeholder='eg: updates a certain user'
            labelStyles='text-gray-400'
            type='text'
            variant='filled'
          />
        </form>
      </Form>
    </ActionModal>
  );
};

export default CreatePermission;
