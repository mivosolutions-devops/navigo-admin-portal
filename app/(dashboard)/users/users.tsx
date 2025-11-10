"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FiMoreHorizontal } from "react-icons/fi";
import { Checkbox } from "@/components/ui/checkbox";
import { BiExport, BiUpArrowAlt } from "react-icons/bi";
import DataTable from "@/components/ui/data-table";
import { useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import AddUser from "@/components/users/add-user";
import useQueryParams from "@/hooks/useQueryParams";
import { getNumericSearchParam } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usersService } from "@/services";

const Users = () => {
    const {searchParams} = useQueryParams();
    const selectedPage = getNumericSearchParam(searchParams, "page", 1);
    const limit = getNumericSearchParam(searchParams, "limit", 10);

    const { data } = useSuspenseQuery<TUsersState>({
        queryKey: ["users", { selectedPage, limit }],
        queryFn: () =>
          usersService.getUsers(
            { page: selectedPage, limit }
          ),
      });
      const items = data?.items || [];
      const totalPages = data?.totalPages || 1;
      const totalUsers = data?.totalItems || 0;
  const columns: ColumnDef<TUserData>[] = [
    {
      accessorKey: "id",
      header: ({ table }) => {
        return (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value: any) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        );
      },
      cell: ({ row }) => {
        return (
          <div className="">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value: any) => row.toggleSelected(!!value)}
            />
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "username",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>User name</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <span>{row.getValue("username")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>Email</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return <div className="">{row.getValue("email")}</div>;
      },
    },
    {
      accessorKey: "profile.firstName",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>First name</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        const profile = row.original.profile
        return <div className="">{profile ? profile.firstName : "No first name"}</div>;
      },
    },
    {
      accessorKey: "profile.lastName",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>Last name</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        const profile = row.original.profile
        return <div className="">{profile ? profile.lastName : "No last name"}</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="text-gray-800 text-with-icon">
          <span>Status</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span>{row.getValue("status")}</span>
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <span className="text-gray-800">Actions</span>,
      cell: ({ row }) => {
        const {
          email,
          profile,
          id,
          username,
          status,
        } = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                size={"icon"}
                className={`bg-logo-gradient rounded-full p-3`}
              >
                <FiMoreHorizontal className="text-lg text-white cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" sideOffset={-2}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${profile && `${profile.firstName} ${profile.lastName} with username`} ${username} have email ${email} and account status ${status}`,
                  )
                }
              >
                Copy user details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/users/${id}/roles`}>View roles</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/users/${id}/permissions`}>View permissions</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="w-[98%] flex flex-col items-center justify-center gap-8 mt-8 mb-20 ml-2">
      <div className="w-full flex justify-between">
        <div className="w-[40%] relative flex">
          <CiSearch className="absolute self-center ml-4 text-gray-800" />
          <Input
            type="text"
            className="px-4 pl-10 rounded-full text-gray-800 focus-visible:ring-emerald-500 focus:ring-emerald-500 focus-visible:ring-offset-1"
            placeholder="Search for users"
          />
        </div>
        <div className="w-fit flex items-center justify-center gap-4">
          <AddUser />
          <Button
            type="submit"
            size={"icon"}
            className={`w-full bg-logo-gradient hover:bg-logo-gradient text-white rounded-full py-6 px-5 gap-3`}
          >
            <BiExport className="text-lg" />
            <span>Export as Excel</span>
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={items}
        page="users"
        selectedPage={selectedPage}
        totalItems={totalUsers}
        totalPages={totalPages}
        limit={limit}
      />
    </div>
  );
};

export default Users;
