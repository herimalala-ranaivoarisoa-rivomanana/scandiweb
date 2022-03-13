import React from "react";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import { listSelects } from "../redux/actions/selectActions";
import Product from "./Product";
import Layout from "./layout/Layout";

function ListProduct() {
  const [toDeleteList, setToDeleteList] = useState([]);
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const dispatch = useDispatch();

  const products2 = [
    {
      id: "7",
      sku: "1111",
      name: "1111",
      price: "1111",
      size: "1111",
      type: "DVD",
    },
    {
      id: "10",
      sku: "444",
      name: "4444",
      price: "4444",
      size: "444",
      type: "DVD",
    },
    {
      id: "11",
      sku: "5555",
      name: "5555",
      price: "5555",
      height: "2",
      width: "2",
      length: "2",
      type: "Furniture",
    },
  ];

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  useEffect(() => {
    dispatch(listSelects(toDeleteList));
  }, [toDeleteList]);

  useEffect(() => {
    document.title = "Product list page";
  }, []);
  return (
    <Layout title='Product list' page='list'>
      <div className='products'>
        {products2.map((product) => {
          return (
            <div key={product.sku}>
              <Product
                product={product}
                toDeleteList={toDeleteList}
                setToDeleteList={setToDeleteList}
              />
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default ListProduct;
