"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useInitialRender, useToast } from "@/hooks";
import UserImage from "../../../public/images/userImage.png";
import { logoutUser } from "@/store/slice/userService/userService";
import { CaretDownIcon } from "@radix-ui/react-icons";

const LogoutUser = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const initialRenderComplete = useInitialRender();

  const {
    user: { username },
  } = useAppSelector((state) => state.userService);

  return (
    <div className="relative mt-12">
      <div className="flex items-center gap-4 justify-between">
        <div className=" text-left lg:block">
          {initialRenderComplete && (
            <div className="flex items-center gap-3">
              <Image
                src={UserImage}
                width={40}
                alt="user"
                loading="lazy"
              ></Image>
              <div className="text-xs">
                <p className="block text-sm font-medium text-black">
                  {username
                    ? username.charAt(0).toUpperCase() +
                      username.slice(1).toLowerCase()
                    : "Evano"}
                </p>
                <p className="text-[#757575]">Project Manager</p>
              </div>
            </div>
          )}
        </div>
        <div>
          <CaretDownIcon width={30} height={30} color="#757575" />
        </div>
      </div>
    </div>
  );
};

export default LogoutUser;
