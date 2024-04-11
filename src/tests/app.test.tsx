import { fireEvent } from "@testing-library/react";
import App from "../App";
import { renderWithProviders, screen, userEvent } from "../utils/test-utils";

describe("home page tests", () => {
  beforeEach(() => renderWithProviders(<App />));
  it("search for nav item fake", () => {
    expect(screen.getByText(/fake/i));
  });
  it("search for cart item", () => {
    expect(screen.getByText(/fake/i));
  });
});
describe("tests for detail listing", () => {
  beforeEach(() => renderWithProviders(<App />));
  it("should render redux basics button", async () => {
    // Wait for the element to appear in the DOM
    const goToReduxBasicsButton = await screen.findByText(
      /Redux Basic implementation/i
    );
    expect(goToReduxBasicsButton).toBeInTheDocument();
  });
  it("goes to redux basics page when clicked on redux basics button", async () => {
    const goToReduxBasicsButton = await screen.findByText(
      /Redux Basic implementation/i
    );
    await userEvent.click(goToReduxBasicsButton);
    expect(screen.getByPlaceholderText(/enter a value/i)).toBeInTheDocument();
  });
});
describe("tests for redux basics page", () => {
  beforeEach(() => renderWithProviders(<App />));

  it("render app with initial state 0", async () => {
    const counter = screen.getByText(/Counter/i);
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveTextContent(/0/i);
  });
  it("increment and decrement on pressing increment/decrement buttons", async () => {
    const incrementButton = screen.getByRole("button", { name: "incre" });
    const decrementButton = screen.getByRole("button", { name: "decre" });
    const counter = screen.getByText(/counter/i);
    await userEvent.click(incrementButton);
    expect(counter).toHaveTextContent(/1/i);
    await userEvent.click(decrementButton);
    expect(counter).toHaveTextContent("0");
  });
  it("show the input value that is entered", () => {
    const value: HTMLInputElement =
      screen.getByPlaceholderText(/enter a value/i);
    fireEvent.change(value, { target: { value: "input test" } });
    expect(value).toBeInTheDocument();
    expect(value.value).toBe("input test");
  });
});
