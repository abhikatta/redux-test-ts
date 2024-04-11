import { useDispatch } from "react-redux";

import { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { fetchAllProducts } from "./store/product/productSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import BasicRedux from "./BasicRedux";
import Header from "./components/Header";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <div className="w-auto h-full max-w-[100%] overflow-x-hidden min-h-screen flex flex-col bg-slate-300">
      <BrowserRouter>
        <div>
          <Header />
        </div>
        <Routes>
          <Route path="/" Component={ProductList} />
          <Route path="/product/:productId" Component={ProductDetail} />
          <Route path="/cart" Component={Cart} />
          <Route path="/basics" Component={BasicRedux} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
