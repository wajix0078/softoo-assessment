import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCart } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";

const BasketItem = ({ product }: ProductItemProps) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const { id, img, name, price, quantity } = product;

  const handleAddToProductQuantity = () => {
    const updatedItems = items.map((item) => {
      const productQuantity = product.quantity || 1;
      if (item.id === id) {
        return { ...product, quantity: productQuantity + 1 };
      } else {
        return item;
      }
    });
    dispatch(updateCart(updatedItems));
  };

  const handleRemoveFromProductQuantity = () => {
    if (quantity === 1) {
      handleRemoveFromCart();
      return;
    }
    const updatedItems = items.map((item) => {
      const productQuantity = product.quantity || 1;
      if (item.id === id) {
        return { ...product, quantity: productQuantity - 1 };
      } else {
        return item;
      }
    });
    dispatch(updateCart(updatedItems));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(id));
    toast.success("Item removed!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="hover:scale-105 transition duration-300 hover:shadow-md p-4 bg-white flex flex-col border-2 border-cyan-800 font-serif justify-between mb-4 rounded">
      <div className="flex flex-col items-center">
        <img src={img} alt={name} className="w-16 h-24 mr-4 rounded" />
        <div className="flex flex-col gap-y-3 mt-4">
          <h3 className="text-sm text-cyan-700 font-semibold">{name}</h3>
          <p>{`Price: €${price.toFixed(2)}`}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-5">
        <p className="font-semibold">{`Quantity: ${quantity || 1}`}</p>
        <div className="flex space-x-1 w-1/3">
          <button
            onClick={handleRemoveFromProductQuantity}
            className={
              "bg-gray-400 text-white text-xl px-3 py-1 rounded-md hover:bg-gray-500 transition-colors w-full"
            }
          >
            {"-"}
          </button>
          <button
            onClick={handleAddToProductQuantity}
            className="bg-cyan-600 text-white text-xl px-3 py-1 rounded-md hover:bg-gray-500 transition-colors w-full"
          >
            {"+"}
          </button>
        </div>
        <button
          onClick={handleRemoveFromCart}
          className="bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default BasketItem;
