import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

const CheckoutButton = ({ disabled }: { disabled: boolean }) => {
  console.log(disabled);
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
          disabled={disabled}
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className={`w-full text-center font-semibold mt-5 mb-2 text-white rounded py-2 shadow-md outline-none ${
            disabled
              ? "cursor-not-allowed bg-gray-400"
              : "cursor-pointer bg-orange-500"
          }`}
        >
          Go to checkout
        </button>
      ) : (
        <button
          onClick={onLogin}
          className="w-full text-center bg-gray-900 cursor-pointer font-semibold mt-5 mb-2 text-white rounded py-2 shadow-md outline-none"
        >
          {authLoading ? (
            <Loader2 className="animate-spin w-fit mx-auto" />
          ) : (
            "Login to checkout"
          )}
        </button>
      )}
    </>
  );
};

export default CheckoutButton;
