import axios from "axios";
import {useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Product from "./Product";

const api_instance = axios.create({
  baseURL: "http://localhost/learning/scandiweb/scandiweb-test%20-%20Copy/",
});

function ListProduct() {
  const [products, setProducts] = useState([]);
  const [skuList, setSkuList] = useState([]);
  
  const getList = () => {
    try {
      axios
        .get(`http://localhost/learning/scandiweb/scandiweb-test%20-%20Copy/`)
        .then(function (response) {
          if (response.data && response.data.length > 0)
            {setProducts(response.data);
            console.log(response.data);}
        });
    } catch (e) {
      return e;
    }
  };

  
  const massDelete = async ($skuList) => {
    await api_instance.post(
      "api.php?action=product-delete-selection",
      {
        skuList: skuList,
      }
    );
    getList();
/*     skuList.map((listItem) =>
      setProducts(products.filter((product) => product.sku !== listItem))
    ); */
  };

  useLayoutEffect(()=>{
    getList();
  },[])
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
    </>
  );
}

export default ListProduct;

const Header = styled.header`
  width: 1440px;
  height: 80px;
  margin: auto;
  padding-left: 100px;
  padding-right: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
`;

const Products = styled.div`
  width: 1440px;
  margin: auto;
  padding-top: 80px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:flex-start;
`;
