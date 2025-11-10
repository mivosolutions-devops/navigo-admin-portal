import Logo from "@/components/logo";

const loading = () => {
  return (
    <div className="w-full h-screen grid place-items-center justify-items-center">
      <div className="w-fit py-2 px-4 rounded-full bg-logo-gradient animate-bounce">
        <Logo textVariant="text-sm" logoSize={{ w: "w-4", h: "h-4" }} />
      </div>
    </div>
  );
};

export default loading;
