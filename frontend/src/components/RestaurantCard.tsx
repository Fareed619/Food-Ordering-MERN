import { Restaurant } from "../api/MyRestaurantApi";
import { Link } from "react-router-dom";

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 w-full">
        {/* <div className="aspect-[16/6]"> */}{" "}
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="w-full h-full rounded-t-lg"
        />
        {/* </div> */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
          <h3 className="text-lg font-semibold">{restaurant.restaurantName}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Delivery Price</span>
          <span className="font-semibold">
            ${(restaurant.deliveryPrice / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Delivery Time</span>
          <span className="font-semibold">
            {restaurant.estimatedDeliveryTime} mins
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {restaurant.cuisines.map((cuisine) => (
            <span
              key={cuisine}
              className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-full"
            >
              {cuisine}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
