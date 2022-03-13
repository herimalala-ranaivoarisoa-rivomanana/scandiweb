import React from "react";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import {listSelects} from "../redux/actions/selectActions";

const Product = (props) => {
  const { product} = props;
  const [toDeleteList, setToDeleteList] = useState([]);
  const dispatch = useDispatch();


  const handleChange = (e, product) => {
    const inList = toDeleteList.find((el) => el.sku === product.sku);
    if (e.target.checked) {
      if (!inList) setToDeleteList([...toDeleteList, product]);
    } else {
      if (inList) {
        setToDeleteList(toDeleteList.filter((el) => el !== product));
      }
    }
  };

  useEffect(() => {
    dispatch(listSelects(toDeleteList));
  },[toDeleteList])


  return (
    <div className='productItem'>
      <p className='sku'>{product.sku}</p>
      <p className='name'>{product.name}</p>
      <p className='price'>{Number(product.price).toFixed(2)} $</p>
      {product ? (
        <div className='attributes'>
          {product.type === "DVD" ? (
            <p>Size {product.size && `${product.size} MB`}</p>
          ) : product.type === "Book" ? (
            <p>Weight {product.weight && `${product.weight} KG`}</p>
          ) : product.type === "Furniture" ? (
            <p>
              Dimension{" "}
              {`${product.height && product.height}x${
                product.width && product.width
              }x${product.length && product.length}`}
            </p>
          ) : null}
        </div>
      ) : null}
      <input
        type='checkbox'
        name='selected'
        className='delete-checkbox'
        onChange={(e) => handleChange(e, product)}
      />
    </div>
  );
};

export default Product;
