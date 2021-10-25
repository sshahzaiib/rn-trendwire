import { useSelector } from "react-redux";

export const useIsLoggedInSelector = () =>
  useSelector(state => state.auth.isLoggedIn);

export const useCartItemsCount = () =>
  useSelector(state => state.auth.credentials?.user?.cart?.length ?? 0);

export const useCartItemsSelector = () =>
  useSelector(state => state.auth.credentials?.user?.cart ?? []);

export const useFavoritesSelector = () =>
  useSelector(state => state.auth.credentials?.user?.favorites ?? []);

export const useUserIdSelector = () =>
  useSelector(state => state.auth.credentials?.user?.id);

export const useUserSelector = () =>
  useSelector(state => state.auth.credentials?.user ?? {});

export const useIsInternetConnectedSelector = () =>
  useSelector(state => state.UI.netInfo.isConnected ?? true);
