import { Loader2 } from "lucide-react";
import { useGetMyOrders } from "../api/OrderApi";
import { standartPage } from "../constants/style";
import OrderStatusHeader from "../components/OrderStatusHeader";
import OrderStatusInfo from "../components/OrderStatusInfo";
import Order from "./../../../backend/src/models/order.model";

const OrderStatusPage = () => {
  const { isLoading, orders } = useGetMyOrders();

  if (!orders?.length && !isLoading) {
    return (
      <div className={`${standartPage}`}>
        <h4 className="text-lg font-semibold">No orders to show</h4>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className={`${standartPage}`}>
        <Loader2 className="animate-spin size-12 text-orange-500 w-fit mx-auto" />
      </div>
    );
  }
  return (
    <div className={`${standartPage} space-y-10`}>
      {orders?.map((order) => (
        <div key={order._id}>
          {/* order status header */}
          <OrderStatusHeader order={order} />
          {/* order status information */}
          <OrderStatusInfo order={order} />
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
