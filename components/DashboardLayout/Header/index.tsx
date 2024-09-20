import { Menu, SearchIcon, X } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg0: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const {
    user: { username },
  } = useAppSelector((state) => state.userService);

  return (
    <header className="sticky top-0 z-40 flex w-full bg-[#FAFBFF] ">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            type="button"
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-stroke  p-2 shadow-sm  lg:hidden"
          >
            <span className="relative block h-6 w-6 cursor-pointer">
              <span className="block absolute right-0 h-full w-full">
                <Menu />
              </span>
            </span>
          </button>
        </div>

        <div className="flex ">
          <h3 className="text-black font-semibold">
            Hello{" "}
            {username &&
              username.charAt(0).toUpperCase() +
                username.slice(1).toLowerCase()}{" "}
            👋🏼
          </h3>
        </div>

        <div className="md:flex hidden items-center gap-3">
          <Input
            type="text"
            placeholder="Search"
            className="border-none bg-white rounded-md p-2 placeholder:text-[#B5B7C0] placeholder:text-xs placeholder:pl-8"
            leftIcon={<SearchIcon width={20} color="#7E7E7E" />}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
