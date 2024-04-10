import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach } from "vitest";
import { store } from "../store/store";
import React from "react";
import App from "../App";

afterEach(() => {
  cleanup();
});

const WithStoreAndProps: React.FunctionComponent = (props) => (
  <Provider store={store}>
    <>{props}</>
  </Provider>
);

const renderDefaultApp = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    wrapper: WithStoreAndProps,
    ...options,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render, renderDefaultApp, store };
