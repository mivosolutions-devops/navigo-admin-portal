import { cn } from "@/lib/utils";
import type { FC } from "react";
import { CardHeader, CardTitle, CardContent, Card } from "../ui/card";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

const ClientFeedback: FC<TClientFeedback> = ({
  clientImageUrl,
  clientName,
  clientRole,
  timeTaken,
  message,
  rating,
  route
}) => {
  const filledStars = new Array(Math.floor(rating))
    .fill(undefined)
    .map((_item, idx) => <FaStar className='text-emerald-500' key={idx} />);
  const unFilledStars = new Array(5 - Math.floor(rating))
    .fill(undefined)
    .map((_item, idx) => <CiStar className='text-emerald-500' key={idx} />);

  return (
    <Card
      className={cn(
        "w-full h-fit group shadow-2xl shadow-shadow-500 transition-all border-none ring-1 ring-slate-200 relative rounded-3xl"
      )}
    >
      <CardHeader className='w-full flex items-center justify-center space-y-0 pb-2 gap-3 whitespace-nowrap border-b border-gray-300'>
        <CardTitle
          className={`w-full text-sm font-medium flex items-center gap-2`}
        >
          <div className='relative w-10 h-10 rounded-full overflow-clip'>
            <Image src={clientImageUrl} fill alt='client image' />
          </div>
          <div className='flex flex-col items-start justify-center font-medium text-xs'>
            <span>{clientName}</span>
            <span className='text-emerald-500'>{clientRole}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={"h-full flex flex-col justify-between gap-3 py-6"}
      >
        <div className='w-full flex justify-between items-center text-sm '>
          <div className='flex items-center justify-center gap-1'>
            <span>Rated: </span>
            <span className='flex gap-2'>
              {filledStars} {unFilledStars}
            </span>
          </div>
          <span className='font-medium text-emerald-500'>{rating}</span>
        </div>
        <div className='flex flex-col items-start justify-center gap-3'>
          <RiDoubleQuotesL className='text-gray-400 text-2xl' />
          <p className='text-black/80 text-xs'>{message}</p>
          <RiDoubleQuotesR className='text-gray-400 self-end text-2xl' />
        </div>
        <div className='w-full flex justify-between items-center text-emerald-500 text-xs'>
          <span className='px-2 py-1 bg-emerald-500/20 rounded-full'>
            {route}
          </span>
          <span className='px-2 py-1 bg-emerald-500/20 rounded-full'>
            {timeTaken}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientFeedback;
