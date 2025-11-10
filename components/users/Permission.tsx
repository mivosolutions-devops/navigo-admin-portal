"use client";

import { useState, type FC } from "react";
import {
  CardHeader,
  CardTitle,
  CardContent,
  Card,
  CardDescription,
} from "../ui/card";
import { FiMoreHorizontal } from "react-icons/fi";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import DeletePermission from "../roles/delete-permission";
import UpdatePermission from "../roles/update-permission";

const permissionStyles = {
  create: {
    text: "text-emerald-500",
    lightBg: "bg-emerald-500/5",
    ring: "ring-emerald-500/80",
  },
  read: {
    text: "text-blue-500/80",
    lightBg: "bg-blue-500/5",
    ring: "ring-blue-500/80",
  },
  view: {
    text: "text-blue-500/80",
    lightBg: "bg-blue-500/5",
    ring: "ring-blue-500/80",
  },
  delete: {
    text: "text-red-500",
    lightBg: "bg-red-500/5",
    ring: "ring-red-500/80",
  },
  update: {
    text: "text-yellow-500",
    lightBg: "bg-yellow-500/5",
    ring: "ring-yellow-500/80",
  },
  default: {
    text: "text-gray-500",
    lightBg: "bg-gray-500/5",
    ring: "ring-gray-500/80",
  },
};

const Permission: FC<TPermission & { roleId: string }> = ({
  slug,
  active,
  description,
  id,
  roleId,
}) => {
  const permissionType = slug.split(".")[0];
  type TKeyType = { create: {}; read: {}; update: {}; delete: {}; view: {} };

  const styles =
    permissionStyles[permissionType as keyof TKeyType] ||
    permissionStyles.default;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <UpdatePermission
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        slug={slug}
        active={active}
        id={id}
        description={description}
      />
      <DeletePermission
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        roleId={roleId}
        permissionId={id}
      />
      <Card
        className={cn("rounded-xl ring-1", Object.values(styles).join(" "))}
      >
        <CardHeader className="py-3 space-y-1">
          <CardTitle className="text-lg font-semibold self-end">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  size={"sm"}
                  className={cn(
                    "h-6 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent hover:bg-transparent",
                    styles.text,
                  )}
                >
                  <FiMoreHorizontal className="text-lg cursor-pointer" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <button
                    className="w-full"
                    onClick={() => setIsDeleteOpen(true)}
                  >
                    Delete
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="w-full"
                    onClick={() => setIsEditOpen(true)}
                  >
                    Update
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center justify-center gap-3 pb-12">
          <span className="text-lg font-semibold">{slug}</span>
          <span className="text-sm">{description}</span>
        </CardContent>
      </Card>
    </>
  );
};

export default Permission;
