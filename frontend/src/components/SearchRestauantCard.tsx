import { Banknote, Clock } from "lucide-react";
import { Restaurant } from "../api/MyRestaurantApi";
import { Link } from "react-router-dom";

type Props = {
  restaurant: Restaurant;
};

const SearchRestauantCard = ({ restaurant }: Props) => {
  return (
    <Link to={`/detail/${restaurant._id}`}>
      <div className="w-[90%] sm:w-[70%] md:w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ">
        <div className="h-44">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.restaurantName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {restaurant.restaurantName}
          </h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {restaurant.cuisines.map((cuisine, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {cuisine}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.estimatedDeliveryTime} mins</span>
            </div>
            <div className="flex items-center gap-1">
              <Banknote className="w-4 h-4" />
              <span>
                Delivery from ${(restaurant.deliveryPrice / 100).toFixed()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchRestauantCard;
