import axios from "@/app/utils/axios";
import { fetchCustomerData } from "@/app/api/apiService";

jest.mock("axios", () => {
  const mockAxiosInstance = {
    get: jest.fn(),
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

describe("fetchCustomerData", () => {
  it("should fetch customer data successfully", async () => {
    const mockData = { users: [{ id: 1, name: "John Doe" }] };

    (axios().get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const data = await fetchCustomerData();

    expect(data).toEqual(mockData);
    expect(axios().get).toHaveBeenCalledWith(`/users?limit=0`);
  });

  it("should handle errors", async () => {
    const errorMessage = "Network Error";

    (axios().get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchCustomerData()).rejects.toThrow(errorMessage);
  });
});
