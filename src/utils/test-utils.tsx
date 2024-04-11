import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach } from "vitest";
import React from "react";
import App from "../BasicRedux";

// import { initialState as counterInitialState } from "../store/counter/counterSlice";
// import { initialState as inputInitialState } from "../store/input/inputSlice";
// import { allProductsInitialState as productsInitialState } from "../store/product/productSlice";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/store";

afterEach(() => {
  cleanup();
});
// const initialState = {
//   counter: counterInitialState,
//   input: inputInitialState,
//   products: productsInitialState,
// };
// const mockStore = reduxMockStore(),
//   store = mockStore({
//     ...initialState,
//   });

const WithStoreAndProps: React.FunctionComponent = (props) => (
  <Provider store={store}>
    <>{props}</>
  </Provider>
);
const renderDefaultApp = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    wrapper: WithStoreAndProps,
    ...options,
  });
}
const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render, renderDefaultApp, store, renderWithProviders };
