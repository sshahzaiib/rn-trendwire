import { useSelector } from "react-redux";

export const useIsLoggedInSelector = () =>
  useSelector(state => state.auth.isLoggedIn);

export const useCartItemsCount = () =>
  useSelector(state => state.cart.selected.length);
