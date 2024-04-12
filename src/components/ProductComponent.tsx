import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
import { Product } from "../store/types";
import { addToCart } from "../store/product/productSlice";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../be-firebase/firebase-config";

const ProductComponent = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  const AddToFirebase = async () => {
    // await setDoc(doc(db, `${user}`, "cart", "items"), {
    //   product,
    // });
  };
  return (
    <div
      key={product.id}
      title={product.description}
      className="w-auto h-auto bg-white rounded-md flex flex-col justify-center items-center py-3">
      <Toaster />
      <Link
        className=" min-h-[20rem] flex flex-col justify-center items-center"
        to={`/product/${product.id}`}>
        <div className=" flex flex-col justify-center items-center px-4 py-2">
          <div className="h-[10rem] w-[10rem] my-2">
            <img
              className="h-full w-full object-contain"
              src={product.image}
              alt={product.title}></img>
          </div>
          <p className="">{product.title}</p>

          <p className="text-md">
            Rating: {product.rating.rate} {"("}
            {product.rating.count}
            {")"}
          </p>
          <p className="text-xl">Price: ${product.price}</p>
        </div>
      </Link>
      <button
        className="bg-slate-200 hover:bg-slate-700 hover:text-white duration-300 rounded-md my-2 px-4 py-2"
        onClick={async () => {
          dispatch(addToCart(product));
          await AddToFirebase();
          toast.success(`${product.title} has been added to cart!`);
        }}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductComponent;
