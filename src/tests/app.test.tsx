import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../store/store";

describe("", () => {
  test("render app with initial state 0", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const counter = screen.getByText(/counter/i);
    expect(counter).toHaveTextContent(/counter/i);
    expect(counter).toHaveTextContent(/0/i);
    expect(counter).toBeInTheDocument();
    screen.debug();
  });
});
