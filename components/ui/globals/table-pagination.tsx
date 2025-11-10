import { Table } from "@tanstack/react-table";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { useRouter } from "next/navigation";
import useQueryParams from "@/hooks/useQueryParams";
import { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { capitalizeLetter1 } from "@/lib/utils";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  page: string;
  selectedPage: number;
  totalPages: number;
  totalItems: number;
}

export function DataTablePagination<TData>({
  table,
  page,
  selectedPage,
  totalPages,
  totalItems,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const { createQueryString, pathname } = useQueryParams();
  const [goTo, setGoTo] = useState("");

  return (
    <div className="w-full flex items-center justify-between px-2 py-8">
      <span className="whitespace-nowrap">
        {table.getRowModel().rows.length} of {totalItems} {page}
      </span>
      <Pagination
        count={totalPages}
        defaultPage={selectedPage}
        siblingCount={0}
        boundaryCount={2}
        sx={{
          "& .Mui-selected": {
            background:
              "linear-gradient(85deg, #28A265 10.01%, #00D56B 114.53%)",
            color: "white",
          },
          "& .MuiPaginationItem-root svg": {
            color: "limegreen",
          },
        }}
        renderItem={(item) => {
          return (
            <Link
              href={`?page=${item.page}`}
              className={`${item.disabled && "pointer-events-none"}`}
              aria-disabled={item.disabled}
              tabIndex={item.disabled ? -1 : undefined}
            >
              <PaginationItem {...item} />
            </Link>
          );
        }}
      />
      <div className="flex items-center justify-center gap-4">
        <span className="whitespace-nowrap">
          {capitalizeLetter1(page)} per page
        </span>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
            router.push(
              pathname + "?" + createQueryString("limit", `${Number(value)}`),
            );
          }}
        >
          <SelectTrigger className="h-8 w-[70px] border-emerald-500 text-gray-800 focus-visible:ring-white focus:ring-0 transition-all duration-800 focus:duration-0 hover:border-2 bg-transparent">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-center gap-4">
        <span className="whitespace-nowrap">Go to</span>
        <Input
          type="number"
          name="page"
          id="page"
          value={goTo}
          onChange={(e) => setGoTo(e.target.value)}
          className="h-8 w-14 focus-visible:ring-0 focus-visible:ring-offset-0 border-no"
        />
        <Button
          type="button"
          size={"icon"}
          className={`bg-logo-gradient rounded-full p-3`}
          onClick={() => {
            router.push(pathname + "?" + createQueryString("page", `${goTo}`));
          }}
          disabled={!goTo}
        >
          Go
        </Button>
      </div>
    </div>
  );
}
