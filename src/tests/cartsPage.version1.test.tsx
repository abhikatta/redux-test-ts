import App from "../App";
import {
  fireEvent,
  renderWithProviders,
  screen,
  userEvent,
} from "../utils/test-utils";

describe("for carts page", () => {
  test("initial render of the cart page", async () => {
    renderWithProviders(<App />);
    const cartButton = await screen.findByRole("button", {
      name: /Show Cart/i,
    });
    const goHomeButton = await screen.findByText(/Fake Store App/i);
    await userEvent.click(cartButton);
    expect(screen.getByText(/No Items in cart/i)).toBeInTheDocument();
    await userEvent.click(goHomeButton);
  });
});

describe("group", () => {
  test("when added a cart item", async () => {
    renderWithProviders(<App />);
    const addToCartButtons = await screen.findAllByRole("button", {
      name: "Add to Cart",
    });
    await userEvent.click(addToCartButtons[0]);
    fireEvent.click(addToCartButtons[0]);
    fireEvent.click(addToCartButtons[0]);

    expect(addToCartButtons.length).toBe(20);
    addToCartButtons.map((button) => expect(button).toBeInTheDocument());
    const cartButton = screen.getByRole("button", {
      name: /Show Cart/i,
    });
    fireEvent.click(cartButton);

    const cartItemDiv = await screen.findByText(/Total/i);
    console.log(cartItemDiv.textContent);

    expect(cartItemDiv).toBeInTheDocument();
  });
});
