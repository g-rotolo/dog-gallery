import axios from "axios";

import { API_KEY } from "./index";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export function getUser(userId) {
  const params = {
    method: "flickr.people.getInfo",
    api_key: API_KEY,
    user_id: userId,
    format: "json",
    nojsoncallback: 1
  };
  return dispatch => {
    dispatch(getUserRequest());
    return axios
      .get("https://api.flickr.com/services/rest/", { params: params })
      .then(response => {
        dispatch(getUserSuccess(response.data.person));
      })
      .catch(error => dispatch(getUserFailure()));
  };
}

export const getUserRequest = () => ({
  type: GET_USER_REQUEST
});

export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  payload: { user }
});

export const getUserFailure = error => ({
  type: GET_USER_FAILURE,
  payload: { error }
});
