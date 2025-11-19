"use client";

import { useSearchParams } from "next/navigation";
import { Fragment } from "react";

export default function QueryParamsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const paramsKey = Array.from(searchParams.entries())
    .map(([key, value]) => `${key}-${value}`)
    .join("&");
  return <Fragment key={paramsKey}>{children}</Fragment>;
}
