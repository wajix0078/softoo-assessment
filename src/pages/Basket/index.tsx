import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import BasketItem from "./BasketItem";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/images/cartEmpty.jpeg";
const Basket = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const totalPrice = items.reduce((acc, item) => {
    const quantity = item.quantity || 1;
    return acc + item.price * quantity;
  }, 0);
  return (
    <div className="p-4 bg-cyan-50 h-screen">
      <div className="flex justify-between">
        <Link
          to={"/"}
          className="flex items-center  hover:bg-gray-300 h-14 w-14 rounded-xl justify-center"
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
</svg>

        </Link>
        <div className="flex justify-between gap-x-2">
          <p className="text-4xl font-bold mb-6 text-center text-cyan-800">
            Shopping Cart
          </p>
          <p className="text-xl text-cyan-600">{`(${items.length})`}</p>
        </div>
        <div />
      </div>
      <div className="flex gap-x-4 ">

      {items.length > 0 ? (
        items.map((item) => <BasketItem key={item.id} product={item} />)
      ) : (
        <div className="flex justify-center  ">
          <img alt="emptyCart" src={emptyCart} />
        </div>
      )}
      </div>
      <p className="text-2xl font-serif font-bold mb-6 text-left">{`Total: €${totalPrice.toFixed(
        2,
      )}`}</p>
    </div>
  );
};

export default Basket;
