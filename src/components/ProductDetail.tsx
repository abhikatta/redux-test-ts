import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store/store";
import { addToCart, fetchSelectedProduct } from "../store/product/productSlice";
import { Toaster, toast } from "sonner";
const ProductDetail = () => {
  const product = useSelector(
    (state: RootState) => state.allProducts.selectedProduct
  );

  const dispatch = useDispatch<AppDispatch>();
  const { productId } = useParams();

  useEffect(() => {
    productId && dispatch(fetchSelectedProduct(parseInt(productId)));
  }, [productId]);

  return product !== null ? (
    <div className="h-full  mt-[10%] w-full flex flex-col md:flex-row items-center justify-center px-4 py-2 gap-10">
      <Toaster />
      <img src={product.image} alt={product.title} width={300}></img>
      <div className="flex max-w-[40%] flex-col  justify-center gap-5">
        <p className="text-2xl">{product.title}</p>
        <p className="">{product.description}</p>
        <p className="text-md">
          Rating: {product.rating.rate} {"("}
          {product.rating.count}
          {")"}
        </p>
        <p className="text-3xl">Price: ${product.price}</p>
        <button
          className="bg-slate-200 w-[20rem] hover:bg-slate-700 hover:text-white duration-300 rounded-md my-2 px-4 py-2"
          onClick={() => {
            dispatch(addToCart(product));
            toast.success(`${product.title} has been added to cart!`);
          }}>
          Add to Cart
        </button>
      </div>
    </div>
  ) : (
    <div className="h-full w-full mt-[20%] flex flex-col items-center justify-center">
      <p className="font-bold text-5xl">Loading...</p>
    </div>
  );
};

export default ProductDetail;
