import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductComponent from "./ProductComponent";

import { fetchAllProducts } from "../store/product/productSlice";
import { AppDispatch, RootState } from "../store/store";
import { Link } from "react-router-dom";
import Header from "./Header";

const ProductList = () => {
  const products = useSelector(
    (state: RootState) => state.allProducts.products
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return products !== null ? (
    <>
      <div className="w-auto mx-3 my-3 h-auto sm:grid sm:grid-cols-2 flex flex-col md:grid md:grid-cols-4 gap-3 ">
        {products.map((product) => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </div>
      <div className=" mb-3 flex flex-col items-center justify-center w-full">
        <Link
          className="rounded-md px-4 text-center py-2 font-bold bg-cyan-100 hover:bg-cyan-400 duration-200"
          to={"/basics"}>
          <button>Redux Basic implementation</button>
        </Link>
      </div>
    </>
  ) : (
    <div className="h-full mt-[20%] w-full flex flex-col items-center justify-center">
      <p className="font-bold text-5xl">Loading...</p>
    </div>
  );
};

export default ProductList;
