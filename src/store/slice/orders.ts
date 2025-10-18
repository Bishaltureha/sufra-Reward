// src/store/slice/orders.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled"
  | "payment_failed";

interface OrderItem {
  id: string;
  name: string;
  image: any;
  price: number;
  quantity: number;
  customization?: any;
  totalPrice: number;
}

interface Order {
  id: string;
  orderId: string; // Display ID like "17212605"
  brandId?: number;
  brandName: string;
  brandLogo: any;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  deliveryFee: number;
  discount: number;
  finalAmount: number;
  orderDate: number; // timestamp
  deliveryAddress?: string;
  paymentMethod?: string;
  estimatedDelivery?: string;
}

interface OrdersState {
  orders: Order[];
  activeOrders: Order[];
  pastOrders: Order[];
}

const initialState: OrdersState = {
  orders: [],
  activeOrders: [],
  pastOrders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload); // Add to beginning
      ordersSlice.caseReducers.categorizeOrders(state);
    },

    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; status: OrderStatus }>
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
        ordersSlice.caseReducers.categorizeOrders(state);
      }
    },

    cancelOrder: (state, action: PayloadAction<string>) => {
      const order = state.orders.find((o) => o.id === action.payload);
      if (order) {
        order.status = "cancelled";
        ordersSlice.caseReducers.categorizeOrders(state);
      }
    },

    clearOrderHistory: (state) => {
      state.orders = [];
      state.activeOrders = [];
      state.pastOrders = [];
    },

    // Helper to categorize orders into active and past
    categorizeOrders: (state) => {
      state.activeOrders = state.orders.filter(
        (order) =>
          order.status === "pending" ||
          order.status === "confirmed" ||
          order.status === "preparing" ||
          order.status === "ready"
      );

      state.pastOrders = state.orders.filter(
        (order) =>
          order.status === "delivered" ||
          order.status === "cancelled" ||
          order.status === "payment_failed"
      );
    },
  },
});

export const { addOrder, updateOrderStatus, cancelOrder, clearOrderHistory } =
  ordersSlice.actions;

export default ordersSlice.reducer;
