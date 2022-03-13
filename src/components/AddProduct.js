import React from "react";
import { useEffect, useState } from "react";
import Layout from "./layout/Layout";

function AddProduct() {
  const typeList = [
    { id: 1, name: "DVD" },
    { id: 2, name: "Book" },
    { id: 3, name: "Furniture" },
  ];

  const [sku, setSku] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [type, setType] = useState();
  const [attributes, setAttributes] = useState({});
  const [error, setError] = useState({
    sku: true,
    name: true,
    price: true,
    size: true,
    weight: true,
    height: true,
    width: true,
    length: true,
  });

  useEffect(() => {
    document.title = "Adding a product page"
  }, [])

  return (
    <Layout
      title='Add product'
      page='add'
      error={error}
      sku={sku}
      name={name}
      price={price}
      type={type}
      attributes={attributes}
    >
      <form id='product_form'>
        <div className="tile">
          <p className="error"
            style={{
              visibility: `${
                sku && sku.length > 0 && error.sku ? "visible" : "hidden"
              }`,
            }}
          >
            Please, provide Alphanumeric characters.
          </p>
          <div className="inputWrapper">
            <label forhtml='sku'>Sku</label>
            <input
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
          </div>
          <p  className="error"
            style={{
              visibility: `${
                name && name.length > 0 && error.name ? "visible" : "hidden"
              }`,
            }}
          >
            Please, provide Alphanumeric characters.
          </p>
          <div className="inputWrapper">
            <label forhtml='name'>Name</label>
            <input
              type='text'
              name='name'
              placeholder='Please enter a name'
              id='name'
              required
              onChange={(e) => {
                setName(e.target.value);
                if (/^[a-zA-Z0-9-\s]+$/.test(e.target.value)) {
                  setError(Object.assign({}, error, { name: false }));
                } else {
                  setError(Object.assign({}, error, { name: true }));
                }
              }}
            />
          </div>
          <p className="error"
            style={{
              visibility: `${
                price && price.length > 0 && error.price ? "visible" : "hidden"
              }`,
            }}
          >
            Please, provide decimal number only.
          </p>
          <div className="inputWrapper">
            <label forhtml='price'>Price ($) </label>
            <input
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
          </div>
          <div className="attributesContainer">
            <div className="productType">
              <select
                style={{ border: "none" }}
                id='productType'
                onChange={(e) => {
                  setType(e.target.value);
                  setAttributes({});
                  if (e.target.value === 'DVD')
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
                  if (e.target.value === 'Book')
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
                  if (e.target.value ==='Furniture')
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
                <option key='type0'>Select type</option>
                {typeList.map((type) => {
                  return (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {type === "DVD" ? (
              <div className="attributes">
                Please provide size in MB:
                <p className="error"
                  style={{
                    visibility: `${
                      attributes.size &&
                      attributes.size.length > 0 &&
                      error.size
                        ? "visible"
                        : "hidden"
                    }`,
                  }}
                >
                  Please, provide numeric characters only.
                </p>
                <input className="attributeValue"
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
              </div>
            ) : type === "Book" ? (
              <div className="attributes">
                Please provide weight in KG:
                <p className="error"
                  style={{
                    visibility: `${
                      attributes.weight &&
                      attributes.weight.length > 0 &&
                      error.weight
                        ? "visible"
                        : "hidden"
                    }`,
                  }}
                >
                  Please, provide numeric characters only.
                </p>
                <input className="attributeValue"
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
              </div>
            ) : type === "Furniture" ? (
              <div className="attributes">
                Please provide dimension (HxWxL):
                <p className="error"
                  style={{
                    visibility: `${
                      attributes.height &&
                      attributes.height.length > 0 &&
                      error.height
                        ? "visible"
                        : "hidden"
                    }`,
                  }}
                >
                  Please, provide numeric characters only.
                </p>
                <input className="attributeValue"
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
                <p className="error"
                  style={{
                    visibility: `${
                      attributes.width &&
                      attributes.width.length > 0 &&
                      error.width
                        ? "visible"
                        : "hidden"
                    }`,
                  }}
                >
                  Please, provide numeric characters only.
                </p>
                <input className="attributeValue"
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
                <p className="error"
                  style={{
                    visibility: `${
                      attributes.length &&
                      attributes.length.length > 0 &&
                      error.length
                        ? "visible"
                        : "hidden"
                    }`,
                  }}
                >
                  Please, provide numeric characters only.
                </p>
                <input className="attributeValue"
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
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </Layout>
  );
}

export default AddProduct;

