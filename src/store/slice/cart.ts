// src/store/slice/cart.ts - ENHANCED VERSION
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductCustomization {
  protein?: {
    id: number;
    name: string;
    price: string;
  };
  extras?: Array<{
    id: number;
    name: string;
    price: string;
  }>;
  different?: Array<{
    id: number;
    name: string;
    price: string;
  }>;
  proteinSize?: "Regular" | "Double";
  proteinSizePrice?: number;
}

interface CartItem {
  id: string;
  name: string;
  image: any;
  price: number;
  originalPrice?: number;
  quantity: number;
  brandId?: number;
  brandName?: string;
  customization?: ProductCustomization;
  totalPrice: number;
  addedAt?: number; // Timestamp when item was added
}

interface CartState {
  items: { [itemId: string]: CartItem };
  activeDeliveryType: "Delivery" | "Pick-up";
  totalItems: number;
  totalPrice: number;
  lastUpdated: number | null; // Track last cart update
}

const initialState: CartState = {
  items: {},
  activeDeliveryType: "Delivery",
  totalItems: 0,
  totalPrice: 0,
  lastUpdated: null,
};

// Helper function to parse price strings
const parsePrice = (priceString: string): number => {
  const match = priceString.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

// Helper function to calculate item price per unit
const calculatePricePerUnit = (
  basePrice: number,
  customization?: ProductCustomization
): number => {
  let pricePerUnit = basePrice;

  if (customization?.protein) {
    pricePerUnit += parsePrice(customization.protein.price);
  }

  if (customization?.extras) {
    customization.extras.forEach((extra) => {
      pricePerUnit += parsePrice(extra.price);
    });
  }

  if (customization?.different) {
    customization.different.forEach((diff) => {
      pricePerUnit += parsePrice(diff.price);
    });
  }

  if (customization?.proteinSizePrice) {
    pricePerUnit += customization.proteinSizePrice;
  }

  return pricePerUnit;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Omit<CartItem, "totalPrice" | "addedAt">;
        customization?: ProductCustomization;
      }>
    ) => {
      const { product, customization } = action.payload;

      // Generate unique ID with customization hash
      const customizationKey = customization
        ? JSON.stringify(customization)
        : "default";
      const uniqueId = `${product.id}-${customizationKey}`;

      // Calculate price per unit
      const pricePerUnit = calculatePricePerUnit(product.price, customization);
      const totalPrice = pricePerUnit * product.quantity;

      if (state.items[uniqueId]) {
        // Item already exists, update quantity and total price
        state.items[uniqueId].quantity += product.quantity;
        const newPricePerUnit = calculatePricePerUnit(
          state.items[uniqueId].price,
          state.items[uniqueId].customization
        );
        state.items[uniqueId].totalPrice =
          newPricePerUnit * state.items[uniqueId].quantity;
      } else {
        // New item
        state.items[uniqueId] = {
          ...product,
          id: uniqueId,
          customization,
          totalPrice,
          addedAt: Date.now(),
        };
      }

      state.lastUpdated = Date.now();
      cartSlice.caseReducers.calculateTotals(state);
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      if (state.items[itemId]) {
        const item = state.items[itemId];
        item.quantity += 1;

        // Recalculate totalPrice
        const pricePerUnit = calculatePricePerUnit(
          item.price,
          item.customization
        );
        item.totalPrice = pricePerUnit * item.quantity;

        state.lastUpdated = Date.now();
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      if (state.items[itemId]) {
        const item = state.items[itemId];

        if (item.quantity > 1) {
          item.quantity -= 1;

          // Recalculate totalPrice
          const pricePerUnit = calculatePricePerUnit(
            item.price,
            item.customization
          );
          item.totalPrice = pricePerUnit * item.quantity;
        } else {
          // Remove item if quantity becomes 0
          delete state.items[itemId];
        }

        state.lastUpdated = Date.now();
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    // Update quantity directly (useful for manual input)
    updateQuantity: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>
    ) => {
      const { itemId, quantity } = action.payload;
      if (state.items[itemId] && quantity > 0) {
        const item = state.items[itemId];
        item.quantity = quantity;

        // Recalculate totalPrice
        const pricePerUnit = calculatePricePerUnit(
          item.price,
          item.customization
        );
        item.totalPrice = pricePerUnit * item.quantity;

        state.lastUpdated = Date.now();
        cartSlice.caseReducers.calculateTotals(state);
      } else if (quantity <= 0) {
        // Remove if quantity is 0 or negative
        delete state.items[itemId];
        state.lastUpdated = Date.now();
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      delete state.items[itemId];
      state.lastUpdated = Date.now();
      cartSlice.caseReducers.calculateTotals(state);
    },

    // Remove all items from a specific brand
    removeItemsByBrand: (state, action: PayloadAction<number>) => {
      const brandId = action.payload;
      Object.keys(state.items).forEach((key) => {
        if (state.items[key].brandId === brandId) {
          delete state.items[key];
        }
      });
      state.lastUpdated = Date.now();
      cartSlice.caseReducers.calculateTotals(state);
    },

    setDeliveryType: (state, action: PayloadAction<"Delivery" | "Pick-up">) => {
      state.activeDeliveryType = action.payload;
      state.lastUpdated = Date.now();
    },

    clearCart: (state) => {
      state.items = {};
      state.totalItems = 0;
      state.totalPrice = 0;
      state.lastUpdated = Date.now();
    },

    // Apply a discount to specific item
    applyItemDiscount: (
      state,
      action: PayloadAction<{ itemId: string; discountPercent: number }>
    ) => {
      const { itemId, discountPercent } = action.payload;
      if (state.items[itemId]) {
        const item = state.items[itemId];
        const pricePerUnit = calculatePricePerUnit(
          item.price,
          item.customization
        );
        const discountedPrice = pricePerUnit * (1 - discountPercent / 100);
        item.totalPrice = discountedPrice * item.quantity;

        state.lastUpdated = Date.now();
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    calculateTotals: (state) => {
      let totalItems = 0;
      let totalPrice = 0;

      Object.values(state.items).forEach((item) => {
        totalItems += item.quantity;
        totalPrice += item.totalPrice;
      });

      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },

    // Merge cart items (useful when syncing guest cart with user cart)
    mergeCarts: (
      state,
      action: PayloadAction<{ [itemId: string]: CartItem }>
    ) => {
      const incomingCart = action.payload;

      Object.keys(incomingCart).forEach((key) => {
        const incomingItem = incomingCart[key];
        if (state.items[key]) {
          // Item exists, add quantities
          state.items[key].quantity += incomingItem.quantity;
          const pricePerUnit = calculatePricePerUnit(
            state.items[key].price,
            state.items[key].customization
          );
          state.items[key].totalPrice =
            pricePerUnit * state.items[key].quantity;
        } else {
          // New item, add it
          state.items[key] = incomingItem;
        }
      });

      state.lastUpdated = Date.now();
      cartSlice.caseReducers.calculateTotals(state);
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
  removeFromCart,
  removeItemsByBrand,
  setDeliveryType,
  clearCart,
  applyItemDiscount,
  mergeCarts,
} = cartSlice.actions;

export default cartSlice.reducer;
