import { Trash2 } from "lucide-react";
import { CardItem } from "../pages/RestaurantDetails";
import { Restaurant } from "../api/MyRestaurantApi";
import CheckoutButton from "./CheckoutButton";
import DeliveryDetailsModal from "./DeliveryDetailsModal";

type Props = {
  cartItems: CardItem[];
  handleRemoveOrderClick: (id: string) => void;
  restaurant: Restaurant;
};

const MyOrders = ({ cartItems, handleRemoveOrderClick, restaurant }: Props) => {
  const getTotalCost = () => {
    const totalCost = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    const totalDelivery = totalCost + restaurant?.deliveryPrice;
    return (totalDelivery / 100).toFixed(2);
  };
  return (
    <div className="flex-1 border border-gray-300 rounded p-5  h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Your Order</h2>
        <span className="text-xl font-bold">${getTotalCost()}</span>
      </div>
      {cartItems?.map((cartItem) => (
        <div
          className="flex items-center justify-between py-3"
          key={cartItem._id}
        >
          <div className="">
            <span className="px-2 shadow-md border border-gray-300 rounded-sm ">
              {cartItem.quantity}
            </span>
            <span className="ml-3">{cartItem.name}</span>
          </div>

          <div className="flex items-center gap-2 ">
            <button onClick={() => handleRemoveOrderClick(cartItem?._id)}>
              <Trash2 className="size-4  text-red-500 cursor-pointer" />
            </button>
            <span className="font-medium text-gray-500">
              ${((cartItem.price * cartItem.quantity) / 100).toFixed(2)}
            </span>
          </div>
        </div>
      ))}

      <hr className="text-gray-300" />
      <div className="my-4  text-gray-500 flex items-center justify-between">
        <p className="text-gray-500 font-medium">Delivery</p>
        <span className="font-medium">
          ${(restaurant.deliveryPrice / 100).toFixed(2)}
        </span>
      </div>
      <hr className="text-gray-300" />

      <CheckoutButton disabled={cartItems.length === 0} />
      <DeliveryDetailsModal cartItems={cartItems} restaurant={restaurant} />
    </div>
  );
};

export default MyOrders;
