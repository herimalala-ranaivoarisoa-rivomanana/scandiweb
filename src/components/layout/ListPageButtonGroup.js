import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {deleteProduct, listProducts} from "../../redux/actions/productActions";

function ListPageButtonGroup() {
  const selectList = useSelector((state) => state.selectList);
  const { selects } = selectList;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const dispatch = useDispatch();

  const massDelete = async () => {
    await dispatch(deleteProduct(selects)).then(() => dispatch(listProducts()));
  };
  return (
    <div>
      <Link to='/addproduct'>
        <button>ADD</button>
      </Link>
      <button onClick={massDelete}>MASS DELETE</button>
    </div>
  );
}

export default ListPageButtonGroup;
