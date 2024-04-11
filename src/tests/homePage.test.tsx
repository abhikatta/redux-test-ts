import App from "../App";
import { renderWithProviders, screen, userEvent } from "../utils/test-utils";

describe("home page tests", () => {
  beforeEach(() => renderWithProviders(<App />));
  test("search for nav item fake", () => {
    expect(screen.getByText(/fake/i));
  });
  test("search for cart item", () => {
    expect(screen.getByText(/fake/i));
  });
});
describe("tests for detail listing", () => {
  beforeEach(() => renderWithProviders(<App />));
  test("should render redux basics button", async () => {
    // Wait for the element to appear in the DOM
    const goToReduxBasicsButton = await screen.findByText(
      /Redux Basic implementation/i
    );
    expect(goToReduxBasicsButton).toBeInTheDocument();
  });
  test("goes to redux basics page when clicked on redux basics button", async () => {
    const goToReduxBasicsButton = await screen.findByText(
      /Redux Basic implementation/i
    );
    await userEvent.click(goToReduxBasicsButton);
    expect(screen.getByPlaceholderText(/enter a value/i)).toBeInTheDocument();
  });
  test("renders home page content with 20 cart items", async () => {
    await userEvent.click(screen.getByText(/Fake/i));
    const loading = screen.queryByText(/Loading/i);
    const items = await screen.findAllByText(/Rating/i);

    expect(items.length).toBe(20);
    expect(loading).not.toBeInTheDocument();
  });
});
