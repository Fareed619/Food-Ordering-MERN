import { useState } from "react";
import { paddingX } from "../constants/style";
import ManageRestaurantForm from "../components/Restuarant/ManageRestaurantForm";
import Orders from "./Orders";
const ManageRestaurantAndOrders = () => {
  const [showPage, setShowPage] = useState("orders");

  const showOrdersHandler = () => {
    setShowPage("orders");
  };
  const showManageRestaurantHandler = () => {
    setShowPage("manage-restaurant");
  };

  return (
    <div className={`${paddingX} pt-22  min-h-screen mb-14`}>
      {/* Toggle between two state in the page */}
      <div className="flex gap-2 bg-gray-200 w-fit p-1.5 rounded font-medium mb-6">
        <button
          className={`p-1.5  rounded cursor-pointer transition-all duration-300  ${
            showPage === "orders" && "bg-white "
          }`}
          onClick={showOrdersHandler}
        >
          Orders
        </button>
        <button
          className={`p-1.5 px-2 transition-all duration-300  rounded cursor-pointer ${
            showPage === "manage-restaurant" && "bg-white"
          }`}
          onClick={showManageRestaurantHandler}
        >
          Manage Restaurant
        </button>
      </div>
      {showPage === "orders" ? (
        <>
          {" "}
          <Orders />
        </>
      ) : (
        <ManageRestaurantForm />
      )}
    </div>
  );
};

export default ManageRestaurantAndOrders;
