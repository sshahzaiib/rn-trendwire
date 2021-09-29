import { http } from "../../utils/config";
import {
  SET_AUTH_ERRORS,
  SET_AUTH_LOADING,
  SET_USER_DATA,
  USER_LOGIN,
  USER_LOGOUT,
} from "../types";

export const signup = (newUser, navigation) => dispatch => {
  dispatch({ type: SET_AUTH_LOADING, payload: true });
  http
    .post("/auth/register", newUser)
    .then(async res => {
      dispatch({ type: SET_USER_DATA, payload: res.data });
      setTimeout(() => {
        navigation.navigate("App");
      }, 1000);
    })
    .catch(error => {
      console.log(error.response.data);
      dispatch({
        type: SET_AUTH_ERRORS,
        payload: error.response.data,
      });
    });
};

export const login = (data, navigation) => dispatch => {
  dispatch({ type: SET_AUTH_LOADING, payload: true });
  http
    .post("/auth/login", data)
    .then(async res => {
      // return console.log(res.data);
      dispatch({ type: USER_LOGIN, payload: res.data });
      setTimeout(() => {
        navigation.navigate("App");
      }, 1000);
    })
    .catch(error => {
      console.log(error.response.data);
      dispatch({
        type: SET_AUTH_ERRORS,
        payload: error.response.data,
      });
    });
};

// Logout action
export const logout = (data, navigation) => async dispatch => {
  // await AsyncStorage.clear();
  await http.post("/auth/logout", data);
  dispatch({
    type: USER_LOGOUT,
  });
  navigation.navigate("Auth");
};
