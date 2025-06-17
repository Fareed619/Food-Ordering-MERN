import { Order } from "../api/OrderApi";

type Props = {
  order: Order;
};

const OrderStatusInfo = ({ order }: Props) => {
  console.log(order);
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between mt-10">
      <div className="flex flex-col space-y-4">
        <div>
          <h4 className="text-lg font-bold">Delivering to: </h4>

          <span>{order?.deliveryDelails?.name}</span>
          <span>{order?.deliveryDelails?.city}</span>
          <span>{order?.deliveryDelails?.addressLine1}</span>
        </div>
        <div>
          <h4 className="text-lg font-bold">Your Order </h4>
          <ul>
            {order.cartItems.map((item) => (
              <li>
                {" "}
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Total </h4>
          <span>${(order.totalAmount / 100).toFixed()}</span>
        </div>
      </div>
      <div className="w-[80%] md:w-[50%] aspect-[16/5]">
        <img
          src={order?.restuarant?.imageUrl}
          alt="restaurant-img"
          className="w-full h-full rounded "
        />
      </div>
    </div>
  );
};

export default OrderStatusInfo;
