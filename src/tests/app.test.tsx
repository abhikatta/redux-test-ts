import { renderDefaultApp, screen, userEvent } from "../utils/test-utils";

beforeEach(() => renderDefaultApp());

describe("first", () => {
  test("render app with initial state 0", () => {
    const counter = screen.getByText(/counter/i);
    expect(counter).toHaveTextContent(/counter/i);
    expect(counter).toHaveTextContent(/0/i);
    expect(counter).toBeInTheDocument();
  });
  test("increment on pressing increment button", async () => {
    const incrementButton = screen.getByRole("button", { name: "incre" });
    const decrementButton = screen.getByRole("button", { name: "decre" });
    const counter = screen.getByText(/counter/i);
    await userEvent.click(incrementButton);
    expect(counter).toHaveTextContent("1");
    await userEvent.click(decrementButton);
    expect(counter).toHaveTextContent("0");
  });
});
