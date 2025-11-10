import React, { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const RouteStatus: FC<TRouteStatus> = ({
  routeName,
  status,
  numberOfVehicles,
}) => {
  return (
    <Card
      className={`"w-full h-full group shadow-2xl shadow-shadow-400 transition-all ring-1 ring-slate-300 rounded-3xl flex flex-col !justify-between cursor-pointer hover:shadow-shadow-500 hover:ring-slate-400 ${status === "low" ? "bg-emerald-500/10" : status === "medium" ? "bg-orange-400/10" : "bg-pink-700/10"}`}
    >
      <CardHeader className="w-full flex items-center justify-center space-y-0 pb-2 whitespace-nowrap">
        <CardTitle
          className={`text-base font-medium flex flex-col items-center justify-center gap-2`}
        >
          <span className="text-gray-700">{routeName}</span>
          <span
            className={
              status === "low"
                ? "text-emerald-500"
                : status === "medium"
                  ? "text-orange-400"
                  : "text-pink-700"
            }
          >
            {status}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={"w-full flex flex-col items-center justify-center gap-2"}
      >
        <p className="text-3xl font-bold">
          {numberOfVehicles} <span className="text-sm">TC</span>
        </p>
        <div
          className={`w-full h-2 rounded-full ${status === "low" ? "bg-emerald-500" : status === "medium" ? "bg-orange-400" : "bg-pink-700"}`}
        ></div>
      </CardContent>
    </Card>
  );
};

export default RouteStatus;
