import {
  GET_USERS_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_ALL_USERS_SUCCESS
} from "../actions/usersActions";

const initialState = {
  users: [],
  isFetching: false,
  error: null
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { ...state, isFetching: true, error: null };
    case GET_USER_SUCCESS:
      const users = [...state.users];
      users.push(action.payload.user);
      return {
        ...state,
        users
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.message
      };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}
