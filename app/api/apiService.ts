import axios from "../utils/axios";
import { API_AUTH_URL } from "../config";
import { LoginFormData } from "@/types.ts";

export const loginUser = async (data: LoginFormData) => {
  return axios(API_AUTH_URL).post("/login", data);
};

export const fetchCustomerData = async () => {
  const response = await axios().get(`/users?limit=0`);
  return response.data;
};
