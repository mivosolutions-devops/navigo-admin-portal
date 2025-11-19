import { formatStringTags } from "@/lib/utils";
import { FC } from "react";

const backgroundStyles = {
  camera: {
    inner: "bg-emerald-500",
    outer: "bg-[#28a26512]",
    textColor: "text-[#042D19]"
  },
  intersection: {
    inner: "bg-[#210841]",
    outer: "bg-[#7948b912]",
    textColor: "text-[#210841]"
  },
  "micro-processor": {
    inner: "bg-[#557EC5]",
    outer: "bg-[#557ec512]",
    textColor: "text-[#091A37]"
  }
};

const SearchResult: FC<TResultData> = ({ content, tag }) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-start gap-4 text-xs font-medium p-2 rounded-lg ${backgroundStyles[tag].outer}`}
    >
      <span
        className={`w-fit p-2 py-1 rounded-md text-white ${backgroundStyles[tag].inner}`}
      >
        {formatStringTags(tag)}
      </span>
      <span className={`${backgroundStyles[tag].textColor}`}>{content}</span>
    </div>
  );
};

export default SearchResult;
