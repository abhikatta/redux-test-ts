import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../store/store";
import userEvent from "@testing-library/user-event";
const renderAppWithStore = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

beforeEach(() => renderAppWithStore());

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
