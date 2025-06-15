import Profile from "../pages/Profile";
import { useCreateCheckoutSession } from "../api/OrderApi";
import { UserFormData } from "../api/MyUserApi";
import { CardItem } from "../pages/RestaurantDetails";
import { Restaurant } from "../api/MyRestaurantApi";
import { useCallback } from "react";

type Props = {
  cartItems: CardItem[];
  restaurant: Restaurant;
};

const DeliveryDetailsModal = ({ restaurant, cartItems }: Props) => {
  const { isPending: loadingCheckout, createCheckoutSession } =
    useCreateCheckoutSession();

  const onCheckout = useCallback(async (userFormData: UserFormData) => {
    if (!restaurant) return;

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      resturantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    try {
      const data = await createCheckoutSession(checkoutData);
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  }, [restaurant, cartItems, createCheckoutSession]);

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-full">
          <Profile
            title="Confirm Delivery Details"
            buttonText="Continue to Checkout"
            onSubmit={onCheckout}
            isUpdatingUser={loadingCheckout}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default DeliveryDetailsModal;
