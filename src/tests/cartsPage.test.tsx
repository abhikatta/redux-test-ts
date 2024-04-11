import App from "../App";
import { renderWithProviders, screen, userEvent } from "../utils/test-utils";

// describe("for carts page", () => {
//   beforeEach(async () => renderWithProviders(<App />));
//   test("initial render of the cart page", async () => {
//     const cartButton = screen.getByRole("button", { name: /Cart/i });
//     await userEvent.click(cartButton);
//     expect(screen.getByText(/No Items in cart/i)).toBeInTheDocument();
//   });
// });

describe("group", () => {
  beforeEach(() => renderWithProviders(<App />));
  test("when added a cart item", async () => {
    const addToCartButtons = await screen.findAllByText(/Add to Cart/i);
    await userEvent.click(addToCartButtons[0]);
    expect(addToCartButtons.length).toBe(20);
    addToCartButtons.map((button) => expect(button).toBeInTheDocument());
    const cartButton = screen.getByRole("button", {
      name: "Cart",
    });
    await userEvent.click(cartButton);
    const cartItemDiv = await screen.findByText(/Total/i);
    expect(cartItemDiv).toBeInTheDocument();
  });
});
