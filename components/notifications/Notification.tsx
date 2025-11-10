import { formatStringTags } from "@/lib/utils";
import { FC } from "react";

const backgroundStyles = {
  camera: {
    inner: "bg-emerald-500",
    outer: "bg-[#28a26512]",
    textColor: "text-[#042D19]",
    innerCirle: "bg-[#28a26559]",
  },
  intersection: {
    inner: "bg-[#210841]",
    outer: "bg-[#7948b912]",
    textColor: "text-[#210841]",
    innerCirle: "bg-[#7948b959]",
  },
  "micro-processor": {
    inner: "bg-[#557EC5]",
    outer: "bg-[#557ec512]",
    textColor: "text-[#091A37]",
    innerCirle: "bg-[#11182721]",
  },
  feedback: {
    inner: "bg-[#111827]",
    outer: "bg-[#557ec512]",
    textColor: "text-[#091A37]",
    innerCirle: "bg-[#11182733]",
  },
};

const Notification: FC<TNotification> = ({ content, date, tag, imgUrl }) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-between text-xs font-medium p-4 rounded-lg ${backgroundStyles[tag].outer}`}
    >
      <div className="flex items-center justify-center gap-4">
        <div
          className={`w-5 h-5 rounded-full grid place-items-center ${backgroundStyles[tag].innerCirle}`}
        >
          <div
            className={`w-3 h-3 rounded-full text-white ${backgroundStyles[tag].inner}`}
          ></div>
        </div>
        <span className={`${backgroundStyles[tag].textColor}`}>{content}</span>
      </div>
      <span>{date}</span>
    </div>
  );
};

export default Notification;
