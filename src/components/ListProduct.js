import React from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import Product from "./Product";
import Layout from "./layout/Layout";

function ListProduct() {
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
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
    document.title = "Product list page";
    console.log(products)
    console.log(products2)
  });
  return (
    <Layout title='Product list' page='list'>
      <div className='products'>
        {products.map((product) => {
          return (
            <div key={product.sku}>
              <Product product={product} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default ListProduct;
