import { Loader } from "lucide-react";
import {
  useGetMyRestaurantOrders,
} from "../api/MyRestaurantApi";

import OrderItemCard from "../components/OrderItemCard";

const Orders = () => {
  const { orders, isLoading } = useGetMyRestaurantOrders();

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }
  return (
    <div className="bg-gray-200 p-4 rounded">
      <h2 className="text-xl font-bold">{orders?.length} Active Orders</h2>
      {orders?.map((order) => {
        return <OrderItemCard key={order._id} order={order} />;
      })}
    </div>
  );
};

export default Orders;
