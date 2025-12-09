import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="m-auto py-16 flex justify-evenly gap-10 bg-linear-to-r  from-blue-600 to-blue-400">
      <Image
        width={1980}
        height={1080}
        src="/login_banner.svg"
        unoptimized
        alt=""
        className="w-70"
      />
      <div className="w-fit">
        <SignIn />
      </div>
    </div>
  );
}
