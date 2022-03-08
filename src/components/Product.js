import styled from "styled-components";

const Product = (props) =>{
  const {product,skuList,setSkuList} = props;
  const handleChange = (e, sku) =>{
    const inList = skuList.find(el=>el===sku);
    if (e.target.checked) { 
      if(!inList) setSkuList([...skuList,sku]);
    }
    else{
      if(inList){
        setSkuList(skuList.filter(el=>el!==sku))
      }
    }
  }

  return(
    <ProductItem>
    <Sku>{product.sku}</Sku>
    <Name>{product.name}</Name>
    <Price>{product.price} $</Price>
    {product? (
      <Attribute>
        {product.typeId === '2' ? (
          <p>
            Size:{" "}
            {product.size && product.size}
          </p>
        ) : product.typeId === "3" ? (
          <p>
            Weight:{" "}
            {product.weight &&
              product.weight}
          </p>
        ) : (
          <p>
            Dimension:{" "}
            {`${
              product.height &&
              product.height
            }x${
              product.width && product.width
            }x${
              product.length &&
              product.length
            }`}
          </p>
        )}
      </Attribute>
    ) : null}
    <CheckBox
      type='checkbox'
      name='selected'
      onChange={(e) => handleChange(e, product.sku)}
    />
  </ProductItem>
  )
}

export default Product;

const ProductItem = styled.div`
  width: 280px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  background: #ffffff;
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
`;

const Sku = styled.p`
font-family: Raleway-semibold;
font-size: 30px;
font-style: normal;
font-weight: 600;
line-height: 27px;
Line height: 77%;
letter-spacing: 0em;
text-align: left;
margin-bottom:16px;
`;

const Name = styled.p`
  font-family: Raleway;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 16px;
`;

const Price = styled.p`
  font-family: Raleway-bold;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 16px;
`;

const Attribute = styled.div`
  font-family: Source Sans Pro;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: center;
`;

const CheckBox = styled.input`
  position: relative;
  left: 120px;
  top: -130px;
  z-index: 20;
`;
