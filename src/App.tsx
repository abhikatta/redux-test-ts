import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import {
  addToCart,
  fetchAllProducts,
  selectProduct,
} from "./store/product/productSlice";
import { Link } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const allProducts = useSelector(
    (state: RootState) => state.allProducts.products
  );
  const cartProducts = useSelector(
    (state: RootState) => state.allProducts.cartProducts
  );
  const selectedProduct = useSelector(
    (state: RootState) => state.allProducts.selectedProduct
  );
  useEffect(() => {
    console.log(selectedProduct);
  }, [selectedProduct]);
  return (
    <div>
      {allProducts.map((product) => {
        return (
          <div
            onClick={() => dispatch(selectProduct(product))}
            key={product.id}>
            <p>{product.id}</p>
            <p>{product.title}</p>
            <p>{product.category}</p>
          </div>
        );
      })}
      {selectedProduct && (
        <div>
          {selectedProduct.id}
          {selectedProduct.category}
        </div>
      )}
      {/* <p>Cart Products:</p> */}
      {/* <div>
        {cartProducts.map((product, index) => {
          return (
            <div onClick={() => dispatch(addToCart(product))} key={product.id}>
              <p>{product.id}</p>
              <p>{product.title}</p>
              <p>{product.category}</p>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default App;
