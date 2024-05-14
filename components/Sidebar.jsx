import {
  Card,
  Divider,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/Home");
  };

  return (
    <div className="fixed border-r-1 border-black sm:invisible lg:visible min-h-full w-64 p-4 rounded-none bg-zinc-800 text-white">
      <div className="grid grid-cols-1 gap-4"></div>
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
