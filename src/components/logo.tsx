import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { FC } from "react";

const Logo: FC<{
  textVariant?: TextSizes;
  logoSize?: { w: string; h: string };
}> = ({ textVariant, logoSize }) => {
  return (
    <div className='flex gap-2 items-center justify-center self-start'>
      <div
        className={cn("relative w-10 h-10", `${logoSize?.w} ${logoSize?.h}`)}
      >
        <Image src={"/logo-for-pages.svg"} fill alt='navigo logo' />
      </div>
      <h2
        className={cn("flex text-3xl font-bold text-transparent", textVariant)}
      >
        <span className='text-white'>Navi</span>
        <span className='text-emerald-500 uppercase outline-text tracking-wide'>
          go
        </span>
      </h2>
    </div>
  );
};

export default Logo;
