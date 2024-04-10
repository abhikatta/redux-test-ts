import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../constants/api";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
interface CartProduct extends Product {
  quantity: number;
}
const products: Product[] = [];
const cartProducts: CartProduct[] = [];
const selectedProduct: Product | null = products[0];

const allProductsInitialState = {
  products: products,
  cartProducts: cartProducts,
  selectedProduct: selectedProduct,
};

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    const res = await fetch(API_ENDPOINT);
    const data = await res.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "allProducts",
  initialState: allProductsInitialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        state.cartProducts[existingProductIndex].quantity += 1;
      } else {
        const newCartProduct = { ...action.payload, quantity: 1 };
        state.cartProducts.push(newCartProduct);
      }
    },
    removeFromCart: (state, action: PayloadAction<CartProduct>) => {
      const productIndexToRemove = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (productIndexToRemove !== -1) {
        const cartProducts = state.cartProducts;
        if (cartProducts[productIndexToRemove].quantity > 1) {
          cartProducts[productIndexToRemove].quantity -= 1;
        } else {
          cartProducts.splice(productIndexToRemove, 1);
        }
      }
    },
    selectProduct: (state, action: PayloadAction<Product>) => {
      (state.selectedProduct as unknown as Product) = action.payload;
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
      ),
});
export default productsSlice.reducer;
export const { selectProduct, addToCart, removeFromCart } =
  productsSlice.actions;
