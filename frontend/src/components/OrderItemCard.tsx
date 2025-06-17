import { useEffect, useState } from "react";
import { Order, OrderStatus } from "../api/OrderApi";
import { useUpdateMyRestaurantOrder } from "../api/MyRestaurantApi";
import { ORDER_STATUS } from "../utils/orderStatusPercentage";

type Props = {
  order: Order;
};
const OrderItemCard = ({ order }: Props) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const { isPending, updateRestaurantStatus } = useUpdateMyRestaurantOrder();
  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);
  const handleStatusChanged = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };
  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };
  return (
    <div className="mt-4 w-full rounded shadow-md p-3 bg-gray-100">
      <div className="flex flex-col md:flex-row ">
        <span className="font-bold flex-1">
          Customer Name:{" "}
          <span className="text-base font-normal">
            {order.deliveryDelails.name}
          </span>
        </span>
        <span className="font-bold flex-2">
          Delivery Address:{" "}
          <span className="text-base font-normal">
            {order.deliveryDelails.addressLine1}, {order.deliveryDelails.city}
          </span>
        </span>
        <span className="font-bold flex-1">
          Time: <span className="text-base font-normal">{getTime()}</span>
        </span>
        <span className="font-bold flex-1">
          Total Cost:{" "}
          <span className="text-base font-normal">
            {" "}
            ${(order.totalAmount / 100).toFixed(2)}
          </span>{" "}
        </span>
      </div>
      <hr className="w-full text-gray-300 mt-4" />
      <div className="mt-3">
        {order.cartItems.map((cartItem, i) => (
          <div key={i}>
            <span className="mr-2 font-semibold">{cartItem.quantity}</span>
            <span className="font-semibold">{cartItem.name}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <label htmlFor="status" className=" font-semibold">
          What is the status of this order?
        </label>
        <select
          id="status"
          className="w-[90%] md:w-[40%] p-1 outline-none rounded-md "
          value={status}
          onChange={(e) => handleStatusChanged(e.target.value as OrderStatus)}
          disabled={isPending}
        >
          {ORDER_STATUS?.map((orderStatus) => (
            <option
              // selected={orderStatus.value === order.status}
              value={orderStatus.value}
            >
              {orderStatus.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OrderItemCard;
