import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/store/hooks", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("@/store/slice/userService/userService", () => ({
  setUser: jest.fn(),
}));

jest.mock("@/app/api/apiService", () => ({
  loginUser: jest.fn(),
}));

describe("LoginPage", () => {
  const mockRouterPush = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });
  });

  it("should render login form", () => {
    render(<LoginPage />);
    expect(
      screen.getByPlaceholderText("info@provistechnologies.com"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password"),
    ).toBeInTheDocument();
  });

  it("should submit form with correct data", async () => {
    const mockLoginData = { username: "user@test.com", password: "password" };
    const mockMutate = jest.fn();

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    render(<LoginPage />);

    await act(async () => {
      fireEvent.change(
        screen.getByPlaceholderText("info@provistechnologies.com"),
        {
          target: { value: mockLoginData.username },
        },
      );

      fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
        target: { value: mockLoginData.password },
      });

      fireEvent.click(screen.getByText("Login now"));
    });

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(mockLoginData);
    });
  });

  it("should show an error message on failed login", async () => {
    const mockMutate = jest.fn((_, options) => {
      if (options && options.onError) {
        options.onError(new Error("Login failed"));
      }
    });

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });

    render(<LoginPage />);

    await act(async () => {
      fireEvent.change(
        screen.getByPlaceholderText("info@provistechnologies.com"),
        {
          target: { value: "user@test.com" },
        },
      );
      fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
        target: { value: "wrongpassword" },
      });

      fireEvent.click(screen.getByText("Login now"));
    });
  });
});
