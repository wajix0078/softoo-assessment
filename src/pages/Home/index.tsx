import { Action } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import ProductList from "../../components/ProductList";
import { fetchProducts } from "../../redux/apiSlice";
import { RootState } from "../../redux/store";

function Home() {
  const [colorFilter, setColorFilter] = useState<string>("");
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const products = useSelector((state: RootState) => state.api.products);
  const { items } = useSelector((state: RootState) => state.cart);
  const cartItems = items.reduce((acc, item) => {
    const quantity = item.quantity || 1;
    return acc + quantity;
  }, 0);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleColorFilterChange = (selectedColor: string) => {
    setColorFilter(selectedColor);
  };

  return (
    <div className="p-4 h-screen bg-cyan-50">
      <h1 className="text-4xl border-l-4 border-cyan-800 font-bold mb-6 text-left  text-cyan-500">
        <span className="pl-4">
          
          Catalogue
          </span> 
      </h1>
      <div className="flex justify-end px-14">
        <NavLink
          data-testid="t_cartlink"
          to={"/cart"}
          className="flex flex-col items-center bg-cyan-200 py-4 px-8 hover:opacity-60 transition-all duration-500 gap-y-0  rounded-full text-cyan-800 justify-center"
        >
         
          <p className="text-xl ">{`${cartItems}`}</p>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-2 w-10">
          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
        </svg>
       
        </NavLink>
      </div>
      <ProductList
        products={products}
        handleColorFilterChange={handleColorFilterChange}
        colorFilter={colorFilter}
      />
    </div>
  );
}

export default Home;
