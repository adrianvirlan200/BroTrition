import Image from "next/image";
import { Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/Home");
  };

  return (
    <div className="top-0 fixed sm:invisible lg:visible min-h-full w-64 rounded-none bg-zinc-800 text-white">
      <Link href={"/Home"} className="text-xl text-bold pt-3 pl-4">
        <Image src="/brotrition_assets/png/pear.png" width="40" height="40" />
        <p className="font-bold text-inherit text-4xl green_gradient">
          BroTrition
        </p>
      </Link>
      <div className="p-5">
        <button
          onClick={handleRedirect}
          className="text-xl hover:bg-zinc-600 w-full rounded-lg p-1"
        >
          DashBoard
        </button>
      </div>
      <button
        onClick
        className="text-xl mx-auto hover:bg-zinc-600 w-full rounded-lg p-2"
      >
        Menu2
      </button>
      <button
        onClick
        className="text-xl mx-auto hover:bg-zinc-600 w-full rounded-lg p-2"
      >
        Menu3
      </button>
      <button
        onClick
        className="text-xl mx-auto hover:bg-zinc-600 w-full rounded-lg p-2"
      >
        Menu4
      </button>
      <button
        onClick
        className="text-xl mx-auto hover:bg-zinc-600 w-full rounded-lg p-2"
      >
        Menu5
      </button>
    </div>
  );
};

export default Sidebar;
