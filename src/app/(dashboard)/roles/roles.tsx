"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Role from "@/components/users/Role";
import { CiSearch } from "react-icons/ci";
import { BiUserPlus } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import { useState } from "react";
import { CustomPagination } from "@/components/ui/globals/custom-pagination";
import { useForm } from "react-hook-form";
import { RoleFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ActionModal from "@/components/ui/globals/action-modal";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/ui/globals/form-field";
import { DialogClose } from "@/components/ui/dialog";
import { RxCross2 } from "react-icons/rx";
import { IoMdPersonAdd } from "react-icons/io";
import { getNumericSearchParam } from "@/lib/utils";
import { rolesService } from "@/services";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { toast } from "sonner";
import useQueryParams from "@/hooks/useQueryParams";

const Roles = () => {
  const { searchParams } = useQueryParams();
  const selectedPage = getNumericSearchParam(searchParams, "page", 1);
  const limit = getNumericSearchParam(searchParams, "limit", 10);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof RoleFormSchema>>({
    resolver: zodResolver(RoleFormSchema),
    defaultValues: {
      name: ""
    }
  });

  const { data } = useSuspenseQuery<TRolesState>({
    queryKey: ["roles", { selectedPage, limit }],
    queryFn: () =>
      rolesService.getRoles(
        { page: selectedPage, limit },
        { permissions: true }
      )
  });

  const queryClient = getQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof RoleFormSchema>) =>
      rolesService.createRole(data.name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      setIsOpen(false);
      form.reset();
      toast.success("Role created successfully!", {
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

  const roles = data?.items || [];
  const totalPages = data?.totalPages || 1;
  const totalRoles = data?.totalItems || 0;

  return (
    <div className='w-[98%] flex flex-col items-center justify-center gap-8 mt-8 mb-20 ml-2'>
      <div className='w-full flex justify-between'>
        <div className='w-[40%] relative flex'>
          <CiSearch className='absolute self-center ml-4 text-gray-800' />
          <Input
            type='text'
            className='px-4 pl-10 rounded-full text-gray-800 focus-visible:ring-emerald-500 focus:ring-emerald-500 focus-visible:ring-offset-1'
            placeholder='search for roles'
          />
        </div>
        <div className='w-fit flex items-center justify-center gap-4'>
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
                <span>Create new role</span>
              </Button>
            }
            title={"Create Role"}
            description=''
            wrapperStyles='text-2xl font-medium items-center lg:max-w-xl'
            footerContent={
              <div className='w-full flex items-center justify-center gap-6'>
                <DialogClose asChild>
                  <Button
                    type='button'
                    className={`bg-gray-200 hover:bg-gray-200 text-slate-500 hover:text-slate-500 rounded-full text-sm py-4 px-6 gap-2 self-center`}
                    variant={"ghost"}
                  >
                    <RxCross2 />
                    <span>Cancel</span>
                  </Button>
                </DialogClose>
                <Button
                  form='create-role-form'
                  type='submit'
                  className={`bg-emerald-500 hover:bg-emerald-500 text-white hover:text-white rounded-full text-sm py-4 px-6 gap-2 self-center`}
                  variant={"ghost"}
                  disabled={!form.formState.isValid}
                >
                  <IoMdPersonAdd />
                  <span>
                    {isPending ? "Creating, please wait..." : "Create new role"}
                  </span>
                </Button>
              </div>
            }
          >
            <Form {...form}>
              <form
                id='create-role-form'
                onSubmit={form.handleSubmit((data) => mutate(data))}
                className='w-full flex flex-col items-center justify-center gap-4'
              >
                <CustomFormField
                  name='name'
                  wrapperStyles='flex flex-col items-center justify-center gap-4'
                  inputStyles='text-base'
                  control={form.control}
                  label='Role name'
                  placeholder='eg: admin'
                  labelStyles='text-gray-400'
                  type='text'
                  variant='filled'
                />
              </form>
            </Form>
          </ActionModal>
          <Button
            type='submit'
            size={"icon"}
            className={`w-full bg-logo-gradient hover:bg-logo-gradient text-white rounded-full py-6 px-5 gap-3`}
          >
            <BiExport className='text-lg' />
            <span>Export as Excel</span>
          </Button>
        </div>
      </div>
      <div className='w-full flex flex-col gap-8 mb-10'>
        {roles?.map((role) => {
          return <Role key={role.id} {...role} />;
        })}
      </div>
      <CustomPagination
        items={roles}
        page='roles'
        selectedPage={selectedPage}
        totalItems={totalRoles}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Roles;
