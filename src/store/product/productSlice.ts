import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/api";
import { CartProduct, Product } from "../types";

const products: Product[] = [];
const cartProducts: CartProduct[] = [];
const selectedProduct: Product | null = products[0];

const allProductsInitialState = {
  products: products,
  cartProducts: cartProducts,
  selectedProduct: selectedProduct,
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
      const existingProductIndex = existingCartProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        existingCartProducts[existingProductIndex].quantity += 1;
      } else {
        const newCartProduct = { ...action.payload, quantity: 1 };
        existingCartProducts.push(newCartProduct);
      }
    },
    removeFromCart: (state, action: PayloadAction<CartProduct>) => {
      const productIndexToRemove = state.products.findIndex(
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
      .addCase(fetchAllProducts.pending, () => {
        console.log("fetching data");
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
