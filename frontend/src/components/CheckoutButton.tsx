import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import DeliveryDetailsModal from "./DeliveryDetailsModal";

const CheckoutButton = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth0();
  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  return (
    <>
      {" "}
      {isAuthenticated ? (
        <button
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="w-full text-center bg-orange-400 cursor-pointer font-semibold mt-5 mb-2 text-white rounded py-2 shadow-md outline-none"
        >
          Go to checkout
        </button>
      ) : (
        <button
          onClick={onLogin}
          className="w-full text-center bg-gray-900 cursor-pointer font-semibold mt-5 mb-2 text-white rounded py-2 shadow-md outline-none"
        >
          Login to checkout
        </button>
      )}
    </>
  );
};

export default CheckoutButton;
