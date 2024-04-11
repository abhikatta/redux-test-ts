import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/api";
import { CartProduct, Product } from "../types";

interface ProductsInitialState {
  products: Product[] | null;
  cartProducts: CartProduct[];
  selectedProduct: Product | null;
}
export const allProductsInitialState: ProductsInitialState = {
  products: [],
  cartProducts: [],
  selectedProduct: null,
};

const fetchAllProducts = createAsyncThunk("fetchAllProducts", async () => {
  const res = await fetch(API_ENDPOINT);
  const data = await res.json();
  return data;
});
const fetchSelectedProduct = createAsyncThunk(
  "fetchSelectedProduct",
  async (id: Product["id"]) => {
    const res = await fetch(`${API_ENDPOINT}/${id}`);
    const data = await res.json();
    return data;
  }
);
const productsSlice = createSlice({
  name: "allProducts",
  initialState: allProductsInitialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingCartProducts = state.cartProducts;
      const existingProductIndex = existingCartProducts!.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        existingCartProducts![existingProductIndex].quantity += 1;
      } else {
        const newCartProduct = { ...action.payload, quantity: 1 };
        existingCartProducts!.push(newCartProduct);
      }
    },
    removeFromCart: (state, action: PayloadAction<CartProduct>) => {
      const productIndexToRemove = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIndexToRemove !== -1) {
        const existingCartProducts = state.cartProducts;
        if (existingCartProducts[productIndexToRemove].quantity > 1) {
          existingCartProducts[productIndexToRemove].quantity -= 1;
        } else {
          existingCartProducts.splice(productIndexToRemove, 1);
        }
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.products = null;
      })
      .addCase(fetchAllProducts.rejected, () => {
        console.log("fetching failed");
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
        }
      )
      .addCase(fetchSelectedProduct.pending, (state) => {
        state.selectedProduct = null;
      })
      .addCase(
        fetchSelectedProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.selectedProduct = action.payload;
        }
      ),
});
const { addToCart, removeFromCart } = productsSlice.actions;
export default productsSlice.reducer;
export { fetchAllProducts, fetchSelectedProduct, addToCart, removeFromCart };
