import api from "../../services/api";
import { DELETE_USER, GET_USERS, USERS_ERROR } from "../types";

export const getUsers =
  (page = 1, search = "") =>
  async (dispatch) => {
    try {
      const res = await api.get(`/users?page=${page}&search=${search}`);
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USERS_ERROR,
        payload: err.response.data,
      });
    }
  };

export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.delete(`/users/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: err.response.data,
    });
  }
};
