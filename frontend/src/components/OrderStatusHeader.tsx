import { Order } from "../api/OrderApi";
import { ORDER_STATUS } from "../utils/orderStatusPercentage";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order?.restuarant?.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes}`;
  };

  const getOrderInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <h2 className="text-2xl font-bold">
          Order Status: {getOrderInfo()?.label}
        </h2>
        <h3 className="text-xl font-bold">
          Expected by: {getExpectedDelivery()}
        </h3>
      </div>
      {/* progress bar */}
      <div
        className={`h-3 w-full bg-gray-200 mt-10 z-6 rounded-full animate-pulse`}
      >
        <div
          style={{ width: `${getOrderInfo()?.progressValue}%` }}
          className={`h-full rounded-full bg-gray-600 z-10`}
        ></div>
      </div>
    </div>
  );
};

export default OrderStatusHeader;
