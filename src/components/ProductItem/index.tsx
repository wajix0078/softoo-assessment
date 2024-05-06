import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useDispatch();
  const { id, img, name, price } = product;
  const { items } = useSelector((state: RootState) => state.cart);

  const handleAddToCart = () => {
    const existingItem = items.find((item: Product) => item.id === id);
    const eiq = existingItem?.quantity || 0;
    if (existingItem) {
      const updatedItems = items.map((item) => {
        if (item.id === id) {
          return { ...product, quantity: eiq + 1 };
        } else {
          return item;
        }
      });
      dispatch(updateCart(updatedItems));
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
    toast.success(`🎉 ${existingItem?.name || "Item"} added to the cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="border-2 border-cyan-700 p-4 bg-white  font flex hover:shadow-md hover:scale-105 transition-all duration-300 flex-col font-serif w-[200px] justify-between mb-4 rounded">
      <div className="flex flex-col items-center">
        <img src={img} alt={name} className="w-18 h-24 mr-4 rounded-xl mb-4" />
        <div className="flex flex-col gap-y-3">
          <h3 className="text-sm text-cyan-800 font-medium">{name}</h3>
          <p>Price: <span className="font-bold">{`€${price.toFixed(2)}`}</span></p>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-cyan-100 hover:scale-110 w-full mt-4 text-cyan-600 flex items-center gap-x-2 justify-center px-3 py-1 rounded-md hover:opacity-70 transition-all duration-300 "
      >
        <span className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
        </svg>
        </span>
        <span> Add to cart</span>

      </button>
    </div>
  );
};

export default ProductItem;
