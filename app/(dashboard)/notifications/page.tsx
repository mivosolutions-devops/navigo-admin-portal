import Notification from "@/components/notifications/Notification";
import Noresults from "@/components/search/no-results";
import { notifications } from "@/lib/placeholder-data";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-start gap-10 mr-6">
      <span className="text-base text-gray-700">
        {notifications.length} results found
      </span>
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <span className="self-start text-xs my-2">Today</span>
        {notifications.length > 0 ? (
          notifications.map((result, idx) => {
            return <Notification {...result} key={idx} />;
          })
        ) : (
          <>
            <Noresults />
            <span>No notifications available at this time!</span>
          </>
        )}
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <span className="self-start text-xs my-2">Yesterday</span>
        {notifications.length > 0 ? (
          notifications.map((result, idx) => {
            return <Notification {...result} key={idx} />;
          })
        ) : (
          <>
            <Noresults />
            <span>No notifications available at this time!</span>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
