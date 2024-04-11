import App from "../App";
import {
  fireEvent,
  renderWithProviders,
  screen,
  userEvent,
} from "../utils/test-utils";

describe("tests for redux basics page", () => {
  beforeEach(() => renderWithProviders(<App />));

  test("render app with initial state 0", async () => {
    const reduxButton = await screen.findByRole("button", {
      name: /Redux Basic/i,
    });
    expect(reduxButton).toBeInTheDocument();
    await userEvent.click(reduxButton);
    const counter = screen.getByText(/counter/i);
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveTextContent(/0/i);
  });
  test("increment and decrement on pressing increment/decrement buttons", async () => {
    const incrementButton = screen.getByRole("button", { name: "incre" });
    const decrementButton = screen.getByRole("button", { name: "decre" });
    const counter = screen.getByText(/counter/i);
    await userEvent.click(incrementButton);
    expect(counter).toHaveTextContent(/1/i);
    await userEvent.click(decrementButton);
    expect(counter).toHaveTextContent(/0/i);
  });
  test("show the input value that is entered", () => {
    const value: HTMLInputElement =
      screen.getByPlaceholderText(/enter a value/i);
    fireEvent.change(value, { target: { value: "input test" } });
    expect(value).toBeInTheDocument();
    expect(value.value).toBe("input test");
  });
});
