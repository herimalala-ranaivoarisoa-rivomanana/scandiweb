import {
  SELECT_LIST_REQUEST,
  SELECT_LIST_SUCCESS,
  SELECT_LIST_FAIL,
} from "../constants/selectConstant";

const listSelects = (selectList) => async (dispatch) => {
  try {
    dispatch({ type: SELECT_LIST_REQUEST });
    dispatch({ type: SELECT_LIST_SUCCESS, payload: selectList });
  } catch (error) {
    dispatch({ type: SELECT_LIST_FAIL, payload: error.message });
  }
};


export { listSelects};
