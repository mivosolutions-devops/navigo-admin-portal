import React, { type FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IoIosMore } from "react-icons/io";

const AnalyticCard: FC<TAnalyticCardProps> = ({
  title,
  extraStyles,
  content,
  titleStyles,
  contentStyles,
}) => {
  return (
    <Card
      className={cn(
        "w-full group shadow-2xl shadow-shadow-500 transition-all border-none ring-1 ring-slate-200 relative rounded-3xl before-card-bg after-card-bg after:w-36 after:h-36 before:w-36 before:h-36 before:left-0 after:-bottom-1 after:right-0 after:rotate-180 before:z-[1] after:z-[1] text-white",
        extraStyles,
      )}
    >
      <CardHeader className="w-full flex flex-row items-center justify-between space-y-0 pb-2 gap-3 whitespace-nowrap relative z-[199]">
        <CardTitle className={cn("text-sm font-medium", titleStyles)}>
          {title}
        </CardTitle>
        <IoIosMore className="text-xl cursor-pointer" />
      </CardHeader>
      <CardContent
        className={cn("flex flex-col gap-6 relative z-[1]", contentStyles)}
      >
        {content}
      </CardContent>
    </Card>
  );
};

export default AnalyticCard;
