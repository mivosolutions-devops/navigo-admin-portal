"use client";

import { useState, type FC } from "react";
import {
  CardHeader,
  CardTitle,
  CardContent,
  Card,
  CardDescription,
} from "../ui/card";
import { CgViewDay } from "react-icons/cg";
import { Button } from "../ui/button";
import Permission from "./Permission";
import { capitalizeLetter1 } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setFormat } from "@/lib/redux/features/roles/rolesSlice";
import { HiOutlineViewGrid } from "react-icons/hi";
import PermissionsTable from "../tables/PermissionsTable";
import AddPermission from "../roles/add-permission";
import DeleteRole from "../roles/delete-role";

const Role: FC<TRole> = ({ name, id, permissions }) => {
  const format = useAppSelector((state) => state.roles.format);
  const dispatch = useAppDispatch();

  const displayName = name ? capitalizeLetter1(name) : "Unknown Role";

  const hasPermissions = Array.isArray(permissions) && permissions.length > 0;

  const isGridFormat = format === "grid";
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="bg-gray-800/5 rounded-xl border-none shadow-none">
      <CardHeader className="">
        <div className="w-full flex justify-between">
          <CardTitle className="text-lg font-semibold">{displayName}</CardTitle>
          <div className="flex items-center justify-center gap-4">
            <AddPermission existingPermissions={permissions} roleId={id} isOpen={isOpen} setIsOpen={setIsOpen} />
            <DeleteRole roleId={id} />
            <Button
              type="button"
              size={"sm"}
              className="bg-white hover:bg-white rounded-full p-6 px-5 text-gray-500 gap-2 transition-all duration-1000"
              onClick={() =>
                dispatch(setFormat(isGridFormat ? "table" : "grid"))
              }
            >
              {isGridFormat ? (
                <CgViewDay className="text-xl" />
              ) : (
                <HiOutlineViewGrid className="text-xl" />
              )}
              <span>View</span>
            </Button>
          </div>
        </div>
        <CardDescription className="text-gray-500 text-sm">
          Permissions
        </CardDescription>
      </CardHeader>
      {isGridFormat ? (
        <CardContent
          className={
            "w-full grid grid-cols-5 gap-4 items-center justify-center"
          }
        >
          {hasPermissions ? (
            permissions.map((permission) => (
              <Permission {...permission} key={permission.id} roleId={id} />
            ))
          ) : (
            <span className="col-span-5 text-center">No permissions found</span>
          )}
        </CardContent>
      ) : (
        <PermissionsTable
          limit={permissions.length}
          permissions={[...permissions]}
          selectedPage={1}
          totalPages={1}
          totalPermissions={permissions.length}
          roleId={id}
          key={permissions.length}
        />
      )}
    </Card>
  );
};

export default Role;
