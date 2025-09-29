import { useParams } from "react-router-dom";
import { standartPage } from "../constants/style";
import { useGetRestaurantById } from "../api/RestaurantApi";
import { Loader2, ShoppingCart } from "lucide-react";
import MyOrders from "../components/MyOrders";
import { MenuItem } from "../api/MyRestaurantApi";
import { useState } from "react";

export type CardItem = MenuItem & {
  quantity: number;
};

const RestaurantDetails = () => {
  const { restaurantId } = useParams();

  const [cartItems, setCartItems] = useState<CardItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const { isLoading, restaurantInfo } = useGetRestaurantById(restaurantId);

  const handleAddOrderClick = (menu: MenuItem) => {
    setCartItems((prev) => {
      const index = prev.findIndex((m) => m._id === menu._id); // return the index of the element
      if (index === -1) {
        sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify([...prev, { ...menu, quantity: 1 }]));
        return [...prev, { ...menu, quantity: 1 }];
      }

      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        quantity: updated[index].quantity + 1,
      };
      sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updated));
      return updated;
    });
  };
  const handleRemoveOrderClick = (id: string) => {
    setCartItems((prev) => {
      const index = prev.findIndex((m) => m._id === id);

      if (index === -1) return prev; // item not found, return unchanged

      const updated = [...prev];

      if (updated[index].quantity === 1) {
        // Remove the item if quantity is 1
        updated.splice(index, 1);
      } else {
        // Otherwise, decrease the quantity
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity - 1,
        };
      }
      sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updated));
      return updated;
    });
  };

  if (!restaurantInfo && !isLoading) {
    return (
      <div className={`${standartPage}`}>
        <h1>Unable to get restaurant Information</h1>
      </div>
    );
  }

  return (
    <div className={`${standartPage}`}>
      {isLoading ? (
        <Loader2 className={`animate-spin mx-auto size-12 text-orange-500`} />
      ) : !isLoading && !restaurantId ? (
        <h2 className="text-2xl font-bold text-center">Unable to laod Restaurant Details</h2>
      ) : (
        <div className="w-full">
          <div className="aspect-[16/6]">
            <img src={restaurantInfo?.imageUrl} alt="img-detail" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col md:flex-row mt-12 gap-10">
            {/* left side */}
            <div className="flex-2">
              <div className="border border-gray-300 shadow-lg p-4 rounded">
                <h2 className="text-2xl font-bold">{restaurantInfo?.restaurantName}</h2>
                <p className="text-gray-400">{restaurantInfo?.country}</p>
                <div className="flex flex-wrap gap-x-5">
                  {restaurantInfo?.cuisines.map((cuisine, index) => (
                    <span key={index} className="text-gray-600 font-medium mt-5">
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>
              {/* Menu */}
              <div className="mt-5">
                {" "}
                <h2 className="text-2xl font-bold">Menu</h2>
                <div className="flex flex-col gap-5 mt-2">
                  {restaurantInfo?.menuItems?.map((menuItem) => (
                    <div key={menuItem._id} className="relative border border-gray-300 p-4 shadow-lg rounded ">
                      <p className="font-semibold mb-2 text-gray-600">{menuItem.name}</p>
                      <p className="font-bold">${(menuItem.price / 100).toFixed(2)}</p>
                      <div
                        onClick={() => handleAddOrderClick(menuItem)}
                        className="absolute top-4 right-4  cursor-pointer shadow-lg p-2 rounded-full"
                      >
                        <ShoppingCart className="text-orange-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* right side */}
            {restaurantInfo && (
              <MyOrders
                cartItems={cartItems}
                handleRemoveOrderClick={handleRemoveOrderClick}
                restaurant={restaurantInfo}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
