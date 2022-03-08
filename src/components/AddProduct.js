import axios from "axios";
import {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function AddProduct() {
  const typeList=[
    { id: 1, name: "DVD" },
    { id: 2, name: "Book" },
    { id: 3, name: "Furniture" },
  ];

  const api_instance = axios.create({
    baseURL: "http://localhost/learning/scandiweb/scandiweb-test%20-%20Copy/",
  });
  const [sku, setSku] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [type, setType] = useState();
  const [attributes, setAttributes] = useState({});
  const [error, setError] = useState({
    sku: false,
    name: false,
    price: false,
    size: false,
    weight: false,
    height: false,
    width: false,
    length: false,
  });


  const save = async () => {
    if (
      !error.sku &&
      !error.name &&
      !error.price &&
      !error.size&&
      !error.weight &&
      !error.height &&
      !error.width &&
      !error.height
    ) {
      await api_instance.post("api.php?action=product-add", {
        sku,
        name,
        price,
        typeId: 2,
        attributes: attributes,
      });
    }
  };
useEffect(()=>{
  console.log(attributes)
},[attributes])
  return (
    <>
      <Header>
        <Title>ADD PRODUCT</Title>
        <Navigation>
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
            <Button onClick={save}>SAVE</Button>
          </Link>
          <Link to='/'>
            <Button>CANCEL</Button>
          </Link>
        </Navigation>
      </Header>
      <form id='product_form'>
        <Product>
          {sku && sku.length > 0 && error.sku && (
            <Error>Please, provide Alphanumeric characters.</Error>
          )}
          <InputWrapper>
            <label forhtml='sku'>Sku: </label>
            <Input
              type='text'
              name='sku'
              placeholder='Please enter sku'
              id='sku'
              required
              onChange={(e) => {
                setSku(e.target.value);
                if (/^[a-zA-Z0-9]+$/.test(e.target.value)) {
                  setError(Object.assign({}, error, { sku: false }));
                } else {
                  setError(Object.assign({}, error, { sku: true }));
                }
              }}
            />
          </InputWrapper>
          {name && name.length > 0 && error.name && (
            <Error>Please, provide Alphanumeric characters.</Error>
          )}
          <InputWrapper>
            <label forhtml='name'>Name: </label>
            <Input
              type='text'
              name='name'
              placeholder='Please enter a name'
              id='name'
              required
              onChange={(e) => {
                setName(e.target.value);
                if (/^[a-zA-Z0-9]+$/.test(e.target.value)) {
                  setError(Object.assign({}, error, { name: false }));
                } else {
                  setError(Object.assign({}, error, { name: true }));
                }
              }}
            />
          </InputWrapper>
          {price && price.length > 0 && error.price && (
            <Error>Please, provide decimal number only.</Error>
          )}
          <InputWrapper>
            <label forhtml='price'>Price: </label>
            <Input
              type='text'
              name='price'
              placeholder='Please enter the price'
              id='price'
              required
              onChange={(e) => {
                setPrice(e.target.value);
                if (/\d+?$/.test(e.target.value)) {
                  setError(Object.assign({}, error, { price: false }));
                } else {
                  setError(Object.assign({}, error, { price: true }));
                }
              }}
            />
          </InputWrapper>
          <AttributesContainer>
            <TypeSelectionBox>
              <> Please select a type: </>
              <select
                style={{ border: "none" }}
                id='productType'
                onChange={(e) => {
                  setType(e.target.value);
                  setAttributes({});
                  if (e.target.value === "1")
                    setError({
                      sku: false,
                      name: false,
                      price: false,
                      size: true,
                      weight: false,
                      height: false,
                      width: false,
                      length: false,
                    });
                  if (e.target.value === "2")
                    setError({
                      sku: false,
                      name: false,
                      price: false,
                      size: false,
                      weight: true,
                      height: false,
                      width: false,
                      length: false,
                    });
                  if (e.target.value === "3")
                    setError({
                      sku: false,
                      name: false,
                      price: false,
                      size: false,
                      weight: false,
                      height: true,
                      width: true,
                      length: true,
                    });
                }}
              >
                <option key='type0'></option>
                {typeList.map((type) => {
                  return (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  );
                })}
              </select>
            </TypeSelectionBox>
            {type === "1" ? (
              <Attributes>
                Please provide size:
                {attributes.size &&
                  attributes.size.length > 0 &&
                  error.size && (
                    <Error>Please, provide numeric characters only.</Error>
                  )}
                <AttributeValue
                  type='text'
                  name='size'
                  placeholder='Size'
                  id='size'
                  required
                  onChange={(e) => {
                    setAttributes({ ...attributes, size: e.target.value });
                    if (/^[0-9]+$/.test(e.target.value)) {
                      setError(Object.assign({}, error, { size: false }));
                    } else {
                      setError(Object.assign({}, error, { size: true }));
                    }
                  }}
                />
              </Attributes>
            ) : type === "2" ? (
              <Attributes>
                Please provide weight:
                {attributes.weight &&
                  attributes.weight.length > 0 &&
                  error.weight && (
                    <Error>Please, provide numeric characters only.</Error>
                  )}
                <AttributeValue
                  type='text'
                  name='weight'
                  placeholder='Weight'
                  id='weight'
                  required
                  onChange={(e) => {
                    setAttributes({ ...attributes, weight: e.target.value });
                    if (/^[0-9]+$/.test(e.target.value)) {
                      setError(Object.assign({}, error, { weight: false }));
                    } else {
                      setError(Object.assign({}, error, { weight: true }));
                    }
                  }}
                />
              </Attributes>
            ) : type === "3" ? (
              <Attributes>
                Please provide dimensions:
                {attributes.height &&
                  attributes.height.length > 0 &&
                  error.height && (
                    <Error>Please, provide numeric characters only.</Error>
                  )}
                <AttributeValue
                  type='text'
                  name='height'
                  placeholder='Height'
                  id='height'
                  required
                  onChange={(e) => {
                    setAttributes({ ...attributes, height: e.target.value });
                    if (/^[0-9]+$/.test(e.target.value)) {
                      setError(Object.assign({}, error, { height: false }));
                    } else {
                      setError(Object.assign({}, error, { height: true }));
                    }
                  }}
                />
                {attributes.width &&
                  attributes.width.length > 0 &&
                  error.width && (
                    <Error>Please, provide numeric characters only.</Error>
                  )}
                <AttributeValue
                  type='text'
                  name='width'
                  placeholder='Width'
                  id='width'
                  required
                  onChange={(e) => {
                    setAttributes({ ...attributes, width: e.target.value });
                    if (/^[0-9]+$/.test(e.target.value)) {
                      setError(Object.assign({}, error, { width: false }));
                    } else {
                      setError(Object.assign({}, error, { width: true }));
                    }
                  }}
                />
                {attributes.length &&
                  attributes.length.length > 0 &&
                  error.length && (
                    <Error>Please, provide numeric characters only.</Error>
                  )}
                <AttributeValue
                  type='text'
                  name='length'
                  placeholder='Length'
                  id='length'
                  required
                  onChange={(e) => {
                    setAttributes({ ...attributes, length: e.target.value });
                    if (/^[0-9]+$/.test(e.target.value)) {
                      setError(Object.assign({}, error, { length: false }));
                    } else {
                      setError(Object.assign({}, error, { length: true }));
                    }
                  }}
                />
              </Attributes>
            ) : null}
          </AttributesContainer>
        </Product>
      </form>
    </>
  );
}

export default AddProduct;

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

const Product = styled.div`
  width: 300px;
  padding-top: 80px;
  margin: auto;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 16px;
  text-align: left;
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  &:hover {
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.25));
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Input = styled.input`
  width: 75%;
  height: 32px;
  margin-top: 16px;
  margin-bottom: 16px;
  padding-left: 8px;
`;

const Error = styled.p`
  color: red;
  font-family: Roboto-semibold;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  ine-height: 160%;
  letter-spacing: 0px;
`;

const AttributesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const TypeSelectionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 32px;
  & select {
    margin-left: 12px;
  }
`;

const Attributes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
`;

const AttributeValue = styled.input`
  width: 50%;
  margin-top: 16px;
  margin-bottom: 16px;
  height: 32px;
  padding-left: 8px;
`;
