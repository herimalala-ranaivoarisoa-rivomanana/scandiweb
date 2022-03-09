import axios from "axios";
import {useEffect, useState } from "react";

import {useSelector, useDispatch} from 'react-redux';
import {listProducts} from "../redux/actions/productActions";
import {listSelects} from  "../redux/actions/selectActions"

import { Link } from "react-router-dom";
import styled from "styled-components";
import Product from "./Product";


const api_instance = axios.create({
  baseURL: "http://localhost/learning/scandiweb/scandiweb-test%20-%20Copy/",
});

function ListProduct() {

  const [skuList, setSkuList] = useState([]);

  const selectList = useSelector(state=>state.selectList);
  const {selects} = selectList;
  const productList = useSelector(state=>state.productList);
  const {products} = productList;
  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(listProducts()); 
     return()=>{
     } ;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    dispatch(listSelects(skuList)); 
  },[skuList,dispatch])

  const massDelete = async ($skuList) => {
    await api_instance.post(
      "api.php?action=product-delete-selection",
      {/*  */
        skuList: selects,
      }
    );
  };

  return (
    <>
      <Header>
        <Title>PRODUCT LIST</Title>
        <Navigation>
          <Link to='/addproduct'>
            <Button>ADD</Button>
          </Link>
          <Button onClick={massDelete}>MASS DELETE</Button>
        </Navigation>
      </Header>
      <section>
        <Products>
          {products.map((product) => {
            return (
              <div key={product.sku}>
                <Product
                  product={product}
                  skuList={skuList}
                  setSkuList={setSkuList}
                />
              </div>
            );
          })}
        </Products>
      </section>
      <footer>Scandiweb test assignement</footer>
    </>
  );
}

export default ListProduct;

const Header = styled.header`
width: 1440px;
height: 80px;
margin: auto;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
border-bottom: 2px solid #ccc;
`;

const Title = styled.h2`
  font-family: Raleway;
  font-size: 42px;
  font-style: normal;
  font-weight: 400;
  line-height: 67px;
  line-height: 160%;
  letter-spacing: 0px;
  text-align: left;
  margin: 0;
`;

const Navigation = styled.nav`
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
font-family: Raleway;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 19px;
ine-height: 160%;
letter-spacing: 0px;
text-align: center;
cursor: pointer;
margin-left: 40px;
border: 1px solid #1d1f22;
width: 119px;
height: 32px;
border-radius: 4px;
`;

const Products = styled.div`
  width: 1440px;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:flex-start;
`;
