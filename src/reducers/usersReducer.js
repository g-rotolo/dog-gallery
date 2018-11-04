import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from "../actions/usersActions";

const initialState = {
  users: [],
  user: {},
  isFetching: false,
  error: null
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, isFetching: true, error: null };
    case GET_USER_SUCCESS:
      const users = [...state.users];
      users.push(action.payload.user);
      return {
        ...state,
        users,
        user: action.payload.user,
        isFetching: false
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.message
      };
    default:
      return state;
  }
}
