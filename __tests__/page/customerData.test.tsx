import { render, screen, waitFor } from "@testing-library/react";
import CustomerInfo from "@/app/dashboard/page";
import { useQuery } from "@tanstack/react-query";
import mockCustomerData from "../../app/mock/customerData";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("CustomerInfo Component", () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockCustomerData,
      isLoading: false,
      isError: false,
      isRefetching: false,
      refetch: jest.fn(),
    });
  });

  it("renders the customer statistics and table when data is available", async () => {
    render(<CustomerInfo />);

    expect(await screen.findByText("Total Users")).toBeInTheDocument();
    expect(
      await screen.findByText(mockCustomerData.users.length.toString()),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
  });

  it("displays loading state when data is loading", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      isRefetching: false,
      refetch: jest.fn(),
    });

    render(<CustomerInfo />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error state if API call fails", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      isRefetching: false,
      refetch: jest.fn(),
    });

    render(<CustomerInfo />);
  });

  it("renders the correct icons", async () => {
    render(<CustomerInfo />);

    const iconOne = screen.getByAltText("iconOne");
    expect(iconOne).toBeInTheDocument();

    const iconArrow = screen.getByAltText("iconArrow");
    expect(iconArrow).toBeInTheDocument();

    const iconTwo = screen.getByAltText("iconTwo");
    expect(iconTwo).toBeInTheDocument();

    const iconDown = screen.getByAltText("iconDown");
    expect(iconDown).toBeInTheDocument();

    const iconThree = screen.getByAltText("iconThree");
    expect(iconThree).toBeInTheDocument();

    const iconActive = screen.getByAltText("iconActive");
    expect(iconActive).toBeInTheDocument();
  });
});
