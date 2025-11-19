/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className='w-full h-screen flex-col flex justify-center items-center pt-5 gap-5'>
      <div className='flex justify-center items-center'>
        <img src='logo.svg' alt='logo' className='w-[180px]' />
      </div>
      <div className='flex flex-col items-center justify-center gap-[20px]'>
        <img src='forbidden.svg' alt='image' className='w-[70%]' />
        <div className='flex flex-col items-center justify-center -top-5'>
          <h1 className='font-semibold text-3xl'>Access denied...</h1>
          <p className='text-lg'>
            You do not have permission to view this resource.
          </p>
        </div>
      </div>

      <button
        className='p-3 w-1/4 font-medium bg-emerald-500 text-white rounded-full'
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default Page;
