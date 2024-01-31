import { CartItem } from "./CartItem";
import { ShippingDetails } from "./ShippingDetails";

export type OrderDetails = {
  id: number;
  orderItems: CartItem[];
  shippingDetails: ShippingDetails;
  paymentMethod: 'credit' | 'paypal';
};