"use client";

import PermissionsTable from "@/components/tables/PermissionsTable";
import { CiSearch } from "react-icons/ci";
import { BiExport } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import CreatePermission from "@/components/permissions/create-permission";
import { useSuspenseQuery } from "@tanstack/react-query";
import { permissionsService } from "@/services";
import { getNumericSearchParam } from "@/lib/utils";

const Permissions = () => {
  const searchParams = useSearchParams();

  const selectedPage = getNumericSearchParam(searchParams, "page", 1);
  const limit = getNumericSearchParam(searchParams, "limit", 10);

  const { data } = useSuspenseQuery<TPermissionsState>({
    queryKey: ["permissions", { selectedPage, limit }],
    queryFn: () =>
      permissionsService.getPermissions({ page: selectedPage, limit }),
  });

  const permissions = data?.items || [];
  const totalPages = data?.totalPages || 1;
  const totalPermissions = data?.totalItems || 0;

  return (
    <div className="w-full flex flex-col gap-4 bg-cardBg p-4 py-8 mt-8 mb-20 ml-2">
      <div className="w-full flex justify-between">
        <div className="w-[40%] relative flex">
          <CiSearch className="absolute self-center ml-4 text-gray-800" />
          <Input
            type="text"
            className="px-4 pl-10 rounded-full text-gray-800 focus-visible:ring-emerald-500 focus:ring-emerald-500 focus-visible:ring-offset-1"
            placeholder="search for permissions"
          />
        </div>
        <div className="w-fit flex items-center justify-center gap-4">
          <CreatePermission />
          <Button
            type="submit"
            size={"icon"}
            className="w-full bg-logo-gradient hover:bg-logo-gradient text-white rounded-full py-6 px-5 gap-3"
          >
            <BiExport className="text-lg" />
            <span>Export as Excel</span>
          </Button>
        </div>
      </div>

      <PermissionsTable
        permissions={permissions}
        selectedPage={selectedPage}
        limit={limit}
        totalPages={totalPages}
        totalPermissions={totalPermissions}
        key={permissions.length}
      />
    </div>
  );
};

export default Permissions;
