"use client";

import DeletePermission from "@/components/roles/delete-permission";
import UpdatePermission from "@/components/roles/update-permission";
import { DeletePermission as DeletePermissionFromSystem } from "@/components/permissions/delete-permission";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";
import { Button } from "../button";
import { Row } from "@tanstack/react-table";

type ActionsTableRowProps<TData> = {
  row: Row<TData>;
  roleId?: string;
};

const ActionsTableRow = <TData extends TPermission>({
  row,
  roleId
}: ActionsTableRowProps<TData>) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <UpdatePermission
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        slug={row.original.slug}
        active={row.original.active}
        id={row.original.id}
        description={row.original.description}
      />
      {roleId ? (
        <DeletePermission
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          roleId={roleId}
          permissionId={row.original.id}
        />
      ) : (
        <DeletePermissionFromSystem
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          permissionId={row.original.id}
        />
      )}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            type='button'
            size={"icon"}
            className={`bg-logo-gradient rounded-full p-3`}
          >
            <FiMoreHorizontal className='text-lg text-white cursor-pointer' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='center'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <button className='w-full' onClick={() => setIsDeleteOpen(true)}>
              Delete permission
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <button className='w-full' onClick={() => setIsEditOpen(true)}>
              Update permission
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionsTableRow;
