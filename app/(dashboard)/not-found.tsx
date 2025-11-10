import Image from "next/image";

export default function NotFound() {
  return (
    <div
      title="404 - Resource Not Found"
      className="w-full h-fit flex flex-col items-center justify-center gap-10"
    >
      <div className="w-full h-[20rem] relative">
        <Image src={"/notfound.svg"} alt="not-found image" fill />
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="font-bold text-2xl text-[#001209]">
            Something went wrong
          </h1>
          <p className="font-normal text-md text-[#001209]">
            Sorry , We can't find this page you're looking for.
          </p>
        </div>

        <button className="py-3 w-1/2 bg-[#00BD5E] text-white rounded-full font-semibold">
          Go to back
        </button>
      </div>
    </div>
  );
}
