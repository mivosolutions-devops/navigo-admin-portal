"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/ui/globals/form-field";
import { RegisterFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { IoMdPersonAdd } from "react-icons/io";
import { DialogClose } from "../ui/dialog";
import { RxCross2 } from "react-icons/rx";
import { BiUserPlus } from "react-icons/bi";
import ActionModal from "../ui/globals/action-modal";
import { useRef, useState } from "react";
import { usersService } from "@/services";
import { getQueryClient } from "@/lib/get-query-client";
import { useMutation } from "@tanstack/react-query";
import useQueryParams from "@/hooks/useQueryParams";
import { toast } from "sonner";

const AddUser = () => {
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const {searchParams} = useQueryParams()

  const queryClient = getQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof RegisterFormSchema>) =>
      usersService.registerUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", searchParams] });
      setIsOpen(false);
      form.reset();
      toast.success("User registered successfully!", {
        position: "top-center",
      });
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
      trigger={
        <Button
          type="submit"
          size={"icon"}
          className={`w-full bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full py-6 px-5 gap-3`}
        >
          <BiUserPlus className="text-xl" />
          <span>Create new user</span>
        </Button>
      }
      title={"Register user"}
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
            form="create-user-form"
            type="submit"
            className={`w-1/2 bg-emerald-500 hover:bg-emerald-500 text-white hover:text-white rounded-full text-sm py-4 px-6 gap-2 self-center`}
            variant={"ghost"}
            disabled={isPending}
          >
            <IoMdPersonAdd />
            <span>{isPending ? "Registering, please wait..." : "Register"}</span>
          </Button>
        </div>
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="w-full flex flex-col items-center justify-center gap-6"
          id="create-user-form"
        >
          <div className="w-full flex gap-2">
            <CustomFormField
              name="firstName"
              inputStyles="text-base"
              control={form.control}
              label="First name"
              placeholder="Enter user's first name"
            />
            <CustomFormField
              name="lastName"
              inputStyles="text-base"
              control={form.control}
              label="Last name"
              placeholder="Enter user's last name"
            />
          </div>
          <CustomFormField
            name="email"
            inputStyles="text-base"
            control={form.control}
            label="Email"
            placeholder="example@gmail.com"
          />
          <CustomFormField
            name="username"
            inputStyles="text-base"
            control={form.control}
            label="Username"
            placeholder="enter user's username"
          />
          <div className="w-full flex gap-2">
            <CustomFormField
              name="password"
              inputStyles="text-base"
              control={form.control}
              label="Password"
              placeholder="Enter user's password"
              type="password"
            />
            <CustomFormField
              name="confirmPassword"
              inputStyles="text-base"
              control={form.control}
              label="Confirm password"
              placeholder="Enter user's password"
              type="password"
            />
          </div>
        </form>
      </Form>
    </ActionModal>
  );
};

export default AddUser;
