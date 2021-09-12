
import axios from "axios";
import { Alert, ToastAndroid } from "react-native";

export const signup = (newUser, navigation) => dispatch => {
  dispatch({ type: SET_LOADING })
  
};

export const login = (data, navigation) => dispatch => {
  dispatch({ type: SET_LOADING });
  axios
    .post("/driver/login", data)
    .then(async res => {
      // return console.log(res.data)
      dispatch({ type: DRIVER_LOGIN, payload: res.data });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      setTimeout(() => {
        navigation.navigate("App");
        dispatch({ type: CLEAR_ERRORS });
      }, 1000);
    })
    .catch(error => {

      dispatch({ type: UNSET_LOADING })
      if (error.response.data.error.status_code == 403) {
        dispatch({
          type: SET_ERRORS,
          payload: {
            invalidCredentials: "Invalid Credentials"
          }
        });
        return;
      }
      dispatch({ type: SET_ERRORS, payload: error.response.data.error.errors });
    });
};

// Logout action
export const driverLogout = navigation => dispatch => {
  axios
    .post("/driver/logout")
    .then(async res => {
      // console.log(res)
      // await AsyncStorage.clear();
      await dispatch({ type: CLEAR_VEHICLES });
      await dispatch({ type: DRIVER_LOGOUT });
      navigation.navigate("Auth");
    })
    .catch(error => {
      console.log(error.response);
    });
};
