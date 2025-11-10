import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return { createQueryString, searchParams, pathname };
};

export default useQueryParams;
