import axios from "axios";

import { API_KEY } from "./index";

export const GET_PHOTOS_REQUEST = "GET_PHOTOS_REQUEST";
export const GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";
export const GET_PHOTOS_FAILURE = "GET_PHOTOS_FAILURE";

export function getPhotos() {
  const params = {
    method: "flickr.photos.search",
    api_key: API_KEY,
    text: "dogs",
    content_type: 1,
    page: 1,
    pages: 1,
    per_page: 100,
    format: "json",
    nojsoncallback: 1
  };
  return dispatch => {
    dispatch(getPhotosRequest());
    return axios
      .get("https://api.flickr.com/services/rest/", { params: params })
      .then(response => {
        dispatch(getPhotosSuccess(response.data.photos.photo));
      })
      .catch(error => dispatch(getPhotosFailure(error)));
  };
}

export const getPhotosRequest = () => ({
  type: GET_PHOTOS_REQUEST
});

export const getPhotosSuccess = photos => ({
  type: GET_PHOTOS_SUCCESS,
  payload: { photos }
});

export const getPhotosFailure = error => ({
  type: GET_PHOTOS_FAILURE,
  payload: { error }
});
