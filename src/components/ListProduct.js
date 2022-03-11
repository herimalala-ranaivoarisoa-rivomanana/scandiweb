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

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  useEffect(() => {
    dispatch(listSelects(toDeleteList));
  }, [toDeleteList]);

  useEffect(() => {
    document.title = "Product list page"
  }, [])
  return (
    <Layout title='Product list' page='list'>
      <button id="delete-product-btn">MASS DELETE</button>
      <button>ADD</button>
      <div className='products'>
        {products.map((product) => {
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
