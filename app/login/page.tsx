"use client";

import _ from "lodash";
import axios from "../utils/axios";
import Image from "next/image";
import BgTop from "../../public/images/bgtop.png";
import BgBottom from "../../public/images/bgbottom.png";
import BgImage from "../../public/images/bgImage.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordIcon from "../../public/images/password.png";
import { ReloadIcon } from "@radix-ui/react-icons";
import EmailIcon from "../../public/images/email.png";
import Line from "../../public/images/line.png";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { useToast } from "@/hooks/use-toast";
import { setUser } from "@/store/slice/userService/userService";
import { API_AUTH_URL } from "../config";
import { loginFormSchema } from "./validation";
import { LoginFormData } from "@/types.ts";
import { addMilliseconds } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "../utils/cookies";

const LoginPage = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => {
      return axios(API_AUTH_URL).post("/login", data);
    },
    onSuccess(data: any) {
      const {
        id,
        username,
        email,
        firstName,
        lastName,
        gender,
        image,
        clusterId,
        token,
        refreshToken,
      } = data?.data || {};

      const decodedToken = jwtDecode<{ exp: number }>(token);
      const ttl = decodedToken?.exp;

      dispatch(
        setUser({
          id,
          username,
          email,
          firstName,
          lastName,
          gender,
          image,
          clusterId,
          token,
          ttl,
          refreshToken,
        }),
      );

      const tokenExpiration = addMilliseconds(new Date(), ttl);

      setCookie("ttl", tokenExpiration.toISOString(), tokenExpiration);

      router.push("/dashboard");

      toast({
        variant: "default",
        title: "Successful",
        description: data?.data?.message || "Login Successful.",
      });
    },
    onError(error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error?.response?.data?.message ||
          "An error occurred, please try again.",
      });
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    if (!_.isEmpty(form.formState.errors)) {
      return;
    }

    mutation.mutate(data);
  };

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 h-screen">
      <div className="bg-[#F4F4F4] relative md:col-span-1 xl:col-span-2  hidden md:flex justify-center items-center">
        <Image
          src={BgTop}
          alt="top"
          className="absolute top-0 left-0 w-52"
          loading="lazy"
        />
        <Image src={BgImage} alt="BgImage" className="w-96" loading="lazy" />
        <Image
          src={BgBottom}
          alt="bottom"
          className="absolute bottom-0 right-10 w-52"
          loading="lazy"
        />
      </div>
      <div className="col-span-1 px-7 flex flex-col justify-center items-center min-h-full">
        <p className="text-center font-semibold mb-14">
          Login into your account
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Email Id:</FormLabel>
                  <FormControl>
                    <Input
                      className="text-xs"
                      placeholder="info@provistechnologies.com"
                      rightIcon={
                        <Image
                          src={EmailIcon}
                          alt="email"
                          width={16}
                          loading="lazy"
                        />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Passwrod</FormLabel>
                  <FormControl>
                    <Input
                      className="text-xs"
                      placeholder="Enter your password"
                      rightIcon={
                        <Image
                          src={PasswordIcon}
                          alt="password"
                          width={16}
                          loading="lazy"
                        />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-xs font-medium text-[#1E2772] float-right cursor-pointer underline pb-9">
              Forgot password?
            </span>
            <div className="">
              <Button
                className="w-full shadow-md shadow-[#1E2772] mb-9"
                type="submit"
                size="lg"
                disabled={mutation.isPending}
              >
                {mutation.isPending && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login now
              </Button>
              <div className="flex gap-7 items-center justify-center w-full mb-9">
                <Image
                  src={Line}
                  alt="line"
                  className="w-36"
                  loading="lazy"
                ></Image>
                <p>OR</p>
                <Image
                  src={Line}
                  alt="line"
                  className="w-36"
                  loading="lazy"
                ></Image>
              </div>
              <Button
                className="w-full bg-white "
                type="submit"
                variant="outline"
                size="lg"
              >
                Signup now
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
