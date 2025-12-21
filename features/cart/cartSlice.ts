import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  discountPrice: number;
  image: string;
  quantity: number;
}


// Define the initial state using that type
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};


export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // add item to cart
    addToCart(state, action: PayloadAction<CartItem>) {
      // const existingItem = state.items.find(
      //   (item) => item.productId === action.payload.productId
      // );

      // if (existingItem) {
      //   existingItem.quantity += 1;
      // } else {
        // }
        state.items.push({ ...action.payload, quantity: 1 });
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload
      );

      if (existingItem) {
        existingItem.quantity -= 1;
        localStorage.setItem("cartss", JSON.stringify(state.items));
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;
