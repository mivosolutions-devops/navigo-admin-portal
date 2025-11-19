import Logo from "@/components/logo";

const loading = () => {
  return (
    <div className='w-full h-screen grid place-items-center justify-items-center'>
      <div className='w-fit py-2 px-4 rounded-full bg-logo-gradient animate-bounce'>
        <Logo textVariant='text-2xl' logoSize={{ w: "w-8", h: "h-8" }} />
      </div>
    </div>
  );
};

export default loading;
