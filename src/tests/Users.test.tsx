import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UsersPage from "../pages/Users";
import { vi } from "vitest";

// mock data
const mockUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "leanne",
    email: "leanne@test.com",
  },
  { id: 2, name: "Ervin Howell", username: "ervin", email: "ervin@test.com" },
];

beforeEach(() => {
  vi.resetAllMocks();
  // mock global fetch
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockUsers),
    } as any)
  );
});

test("typing in filter reduces displayed users", async () => {
  render(<UsersPage />);

  // Wait users to be rendered
  await waitFor(() => {
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
  });

  const input = screen.getByTestId("filter-input");
  fireEvent.change(input, { target: { value: "Leanne" } });

  // Only Leanne 
  expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
  expect(screen.queryByText("Ervin Howell")).not.toBeInTheDocument();
});

