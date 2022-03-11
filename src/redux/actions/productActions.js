import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";

import axios from "axios";
import { SELECT_LIST_REQUEST, SELECT_LIST_SUCCESS } from "../constants/selectConstant";

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      `http://localhost/learning/scandiweb/scandiweb-test%20-%20Copy/`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.sort(function(a, b){return a['id']-b['id']})});
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const { data } = await axios.post(
      `http://localhost/learning/scandiweb/scandiweb-test%20-%20Copy/api.php?action=product-add`,
      product
    );
    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const deleteProduct = (list) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: list });
    await axios.post(
      `http://localhost/learning/scandiweb/scandiweb-test%20-%20Copy/api.php?action=product-delete-selection`,
      { list }
    );
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      `http://localhost/learning/scandiweb/scandiweb-test%20-%20Copy/`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export { listProducts, saveProduct, deleteProduct };
