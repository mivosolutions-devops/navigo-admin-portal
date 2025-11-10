"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { CiSearch } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { IoNotificationsSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { checkPage } from "@/lib/utils";
import { adminPagesDataToCheck } from "@/lib/constants";
import { BiHelpCircle } from "react-icons/bi";
import ActionModal from "./ui/globals/action-modal";
import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";
import useQueryParams from "@/hooks/useQueryParams";

const Nav = () => {
  const { pathname } = useQueryParams();
  const page = pathname.split("/")[1] ?? "";
  const pageContent = checkPage(page, adminPagesDataToCheck);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between py-[2rem]">
      <div className="flex items-center justify-center gap-[0.3rem]">
        <span className="text-2xl font-medium">{pageContent?.title}</span>
        <ActionModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trigger={
            <BiHelpCircle className="self-start cursor-pointer text-gray-600 mt-1" />
          }
          title={pageContent?.title || ""}
          description=""
          wrapperStyles="text-2xl font-medium items-center lg:max-w-3xl"
          footerContent={
            <DialogClose asChild>
              <Button
                type="button"
                size={"icon"}
                className={`w-1/3 bg-emerald-500 hover:bg-emerald-500 text-white hover:text-white rounded-full py-6 px-5 gap-3 self-center`}
                variant={"ghost"}
              >
                Got it
              </Button>
            </DialogClose>
          }
        >
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <p className="text-sm text-center">{pageContent?.modalContent}</p>
          </div>
        </ActionModal>
      </div>
      <div className="w-[40%] relative flex">
        <CiSearch className="absolute self-center ml-4 text-gray-800" />
        <Input
          type="text"
          className="px-4 pl-10 rounded-full text-gray-800 focus-visible:ring-emerald-500 focus:ring-emerald-500 focus-visible:ring-offset-1"
          placeholder="search for anything"
        />
      </div>
      <div className="w-fit flex items-center justify-center gap-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <div className="w-fit flex items-center justify-center gap-2 bg-light-grayish px-4 rounded-full">
              <div className="w-5 h-10 relative">
                <Image src={"/flag.svg"} alt="logo image" fill />
              </div>
              <span className="text-xs uppercase font-medium">en</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="shadow-3xl px-0 mx-0">
            <DropdownMenuLabel className="text-gray-600 text-xs">
              select language
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-white w-full">
              <div className="w-full flex items-center justify-center gap-2 hover:bg-light-grayish">
                <div className="w-5 h-10 relative">
                  <Image src={"/flag.svg"} alt="logo image" fill />
                </div>
                <span className="text-xs uppercase font-medium">en</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-4 rounded-full p-3 bg-light-grayish relative before:absolute before:w-3 before:h-3 before:bg-emerald-500 before:right-1 before:top-0 before:rounded-full before:text-xs">
          <IoNotificationsSharp className="text-gray-600 text-base" />
        </div>
        <div className="w-full flex items-center justify-start gap-3">
          <div className="w-[4rem] h-[2.6rem] rounded-full overflow-clip relative">
            <Image src={"https://picsum.photos/200"} alt="your image" fill />
          </div>
          <div className="flex w-full font-medium flex-col items-start justify-center text-xs whitespace-nowrap">
            <span className="font-normal">Ishimwe Hugues</span>
            <span className="text-emerald-500">Impala Express</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
