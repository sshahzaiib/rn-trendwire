import { http } from "../../utils/config";
import {
  SET_AUTH_ERRORS,
  SET_AUTH_LOADING,
  SET_USER_DATA,
  USER_LOGIN,
  USER_LOGOUT,
} from "../types";
import { navigate } from "../../utils/navigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signup = newUser => dispatch => {
  dispatch({ type: SET_AUTH_LOADING, payload: true });
  http
    .post("/auth/register", newUser)
    .then(async res => {
      dispatch({ type: SET_USER_DATA, payload: res.data });
      setTimeout(() => {
        navigate("App");
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

export const login = data => dispatch => {
  dispatch({ type: SET_AUTH_LOADING, payload: true });
  http
    .post("/auth/login", data)
    .then(async res => {
      // return console.log(res.data);
      dispatch({ type: USER_LOGIN, payload: res.data });
      setTimeout(() => {
        navigate("App");
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

export const getAuthenticatedUserData = userId => dispatch => {
  http
    .get(`/users/${userId}/me`)
    .then(res => {
      dispatch({ type: SET_USER_DATA, payload: res.data });
    })
    .catch(error => {
      console.error(error.response);
    });
};

export const updateProfileImage = (userId, formData) => dispatch => {
  http
    .post(`/users/${userId}/me/updateProfileImage`, formData)
    .then(({ data }) => {
      dispatch({ type: SET_USER_DATA, payload: data });
    })
    .catch(error => {
      console.error(error.response);
    });
};

export const updateProfileData = (userId, data, showToast) => dispatch => {
  dispatch({ type: SET_AUTH_LOADING, payload: true });
  http
    .patch(`/users/${userId}/me`, data)
    .then(res => {
      dispatch({ type: SET_USER_DATA, payload: res.data });
      showToast();
    })
    .catch(error => {
      dispatch({ type: SET_AUTH_LOADING, payload: false });
      console.error(error.response);
    });
};

export const changePassword = (data, showToast) => dispatch => {
  http
    .patch(`/auth/change-password`, data)
    .then(res => {
      showToast("Password Updated!");
    })
    .catch(error => {
      showToast("Something went wrong. Please try again.");
      console.error(error.response);
    });
};

// Logout action
export const logout = data => async dispatch => {
  await AsyncStorage.clear();
  dispatch({
    type: USER_LOGOUT,
  });
  navigate("Auth");
  http.post("/auth/logout", data);
};
