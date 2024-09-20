import { loginUser } from "@/app/api/apiService";
import { API_AUTH_URL } from "@/app/config";
import axios from "@/app/utils/axios";
import { LoginFormData } from "@/types.ts";

jest.mock("axios", () => {
  const mockAxiosInstance = {
    post: jest.fn(),
    defaults: {
      baseURL: "",
    },
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  };

  return {
    create: jest.fn(() => mockAxiosInstance),
    default: mockAxiosInstance,
  };
});

describe("loginUser API", () => {
  it("should call the correct API endpoint and return the result on success", async () => {
    const mockResponse = { data: { token: "12345" } };
    const mockData = { username: "testuser", password: "password" };

    (axios(API_AUTH_URL).post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await loginUser(mockData);

    expect(result).toEqual(mockResponse);
    expect(axios(API_AUTH_URL).post).toHaveBeenCalledWith("/login", mockData);
  });

  it("should throw an error if the API call fails", async () => {
    const mockData: LoginFormData = {
      username: "testUser",
      password: "testPass",
    };
    const mockError = new Error("API call failed");

    (axios(API_AUTH_URL).post as jest.Mock).mockRejectedValue(mockError);

    await expect(loginUser(mockData)).rejects.toThrow("API call failed");
    expect(axios(API_AUTH_URL).post).toHaveBeenCalledWith(`/login`, mockData);
  });
});
