import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  restuarant: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  deliveryDelails: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
  },
  cartItems: [
    {
      menuItemId: { type: String, required: true },
      quantity: { type: Number, required: true },
      name: { type: String, required: true },
    },
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["placed", "paid", "inProgress", "outForDelivery", "delivered"],
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("order", orderSchema);
export default Order;
