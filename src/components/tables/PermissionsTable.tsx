import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { BiUpArrowAlt } from "react-icons/bi";
import { type FC } from "react";
import DataTable from "@/components/ui/data-table";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import ActionsTableRow from "../ui/globals/table-row";

const displayContent = {
  create: {
    btnColor: "bg-emerald-500 hover:bg-emerald-500",
    text: "POST"
  },
  read: {
    btnColor: "bg-blue-500 hover:bg-blue-500",
    text: "GET"
  },
  view: {
    btnColor: "bg-blue-500 hover:bg-blue-500",
    text: "GET"
  },
  update: {
    btnColor: "bg-yellow-500 hover:bg-yellow-500",
    text: "PUT"
  },
  delete: {
    btnColor: "bg-red-500 hover:bg-red-500",
    text: "DELETE"
  }
};

const PermissionsTable: FC<{
  permissions: TPermission[];
  selectedPage: number;
  totalPermissions: number;
  totalPages: number;
  limit: number;
  roleId?: string;
}> = ({
  permissions,
  selectedPage,
  totalPermissions,
  totalPages,
  limit,
  roleId
}) => {
  const columns: ColumnDef<TPermission>[] = [
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
          <div className=''>
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value: any) => row.toggleSelected(!!value)}
            />
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: "slug",
      header: () => (
        <div className='text-gray-800 text-with-icon'>
          <span>Slug entry</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className='flex items-center gap-2'>
            <span>{(row.getValue("slug") as string).split(".")[0]}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "slug-exit",
      header: () => (
        <div className='text-gray-800 text-with-icon'>
          <span>Slug exit</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className=''>
            {(row.getValue("slug") as string).split(".")[1]}
          </div>
        );
      }
    },
    {
      accessorKey: "description",
      header: () => (
        <div className='text-gray-800 text-with-icon'>
          <span>Description</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        return <div className=''>{row.getValue("description")}</div>;
      }
    },
    {
      accessorKey: "status",
      header: () => (
        <div className='text-gray-800 text-with-icon'>
          <span>status</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        const isActive = row.original.active;
        return (
          <div className='flex items-center gap-2'>
            <span>{isActive ? "Active" : "Inactive"}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "method",
      header: () => (
        <div className='text-gray-800 text-with-icon justify-center'>
          <span>Method</span> <BiUpArrowAlt />
        </div>
      ),
      cell: ({ row }) => {
        const permissionType = row.original.slug.split(".")[0];
        type TKeyType = {
          create: object;
          read: object;
          update: object;
          delete: object;
          view: object;
        };

        const isPermissionValid = (type: string): type is keyof TKeyType => {
          return type in displayContent;
        };

        const btnClass = isPermissionValid(permissionType)
          ? displayContent[permissionType as keyof TKeyType].btnColor
          : "bg-gray-500 hover:bg-gray-700";

        const btnText = isPermissionValid(permissionType)
          ? displayContent[permissionType as keyof TKeyType].text
          : "UNKNOWN";

        return (
          <Button
            type='submit'
            size={"icon"}
            className={cn(
              `w-[80%] text-white rounded-full py-4 px-5`,
              btnClass
            )}
          >
            {btnText}
          </Button>
        );
      }
    },
    {
      id: "actions",
      header: () => <span className='text-gray-800'>Actions</span>,
      cell: ({ row }) => {
        return <ActionsTableRow row={row} roleId={roleId} />;
      }
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={permissions}
      page='permissions'
      selectedPage={selectedPage}
      totalItems={totalPermissions}
      totalPages={totalPages}
      limit={limit}
    />
  );
};

export default PermissionsTable;
