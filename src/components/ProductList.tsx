import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductComponent from "./ProductComponent";

import { fetchAllProducts } from "../store/product/productSlice";
import { AppDispatch, RootState } from "../store/store";

const ProductList = () => {
  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    products && (
      <div className="w-auto mx-3 my-3  h-auto sm:grid sm:grid-cols-2 flex flex-col md:grid md:grid-cols-4 gap-3 ">
        {products.map((product) => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </div>
    )
  );
};

export default ProductList;
