import axios from "axios";

import { API_KEY } from "./index";

export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";

export function getAllUsers(photos) {
  console.log(photos);
  const params = {
    method: "flickr.people.getInfo",
    api_key: API_KEY,
    format: "json",
    nojsoncallback: 1
  };
  return dispatch => {
    dispatch(getUsersRequest());
    photos.forEach(photo => {
      params.user_id = photo.owner;
      axios
        .get("https://api.flickr.com/services/rest/", { params: params })
        .then(response => {
          dispatch(getUserSuccess(response.data));
        })
        .catch(error => dispatch(getUserFailure()));
    });
    dispatch(getAllUsersSuccess());
  };
}

export const getUsersRequest = () => ({
  type: GET_USERS_REQUEST
});

export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  payload: { user }
});

export const getUserFailure = error => ({
  type: GET_USER_FAILURE,
  payload: { error }
});

export const getAllUsersSuccess = () => ({
  type: GET_ALL_USERS_SUCCESS
});
