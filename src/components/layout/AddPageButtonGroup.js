import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { listProducts, saveProduct } from "../../redux/actions/productActions";

function AddPageButtonGroup(props) {
  const { error, sku, name, price, type, attributes } = props;

  const dispatch = useDispatch();

  const save = async () => {
    if (
      !error.sku &&
      !error.name &&
      !error.price &&
      !error.size &&
      !error.weight &&
      !error.height &&
      !error.width &&
      !error.height
    ) {
      await dispatch(
        saveProduct({ sku, name, price, typeId: type, attributes })
      ).then(() => dispatch(listProducts()));
    }
  };
  return (
    <div>
      <Link
        to={`${
          !error.sku &&
          !error.name &&
          !error.price &&
          !error.weight &&
          !error.height &&
          !error.width &&
          !error.height
            ? "/"
            : "/addproduct"
        }`}
      >
        <button id='save-product-btn' onClick={save}>
          Save
        </button>
      </Link>

      <Link to='/'>
        <button id='cancel-product-btn'>Cancel</button>
      </Link>
    </div>
  );
}

export default AddPageButtonGroup;
