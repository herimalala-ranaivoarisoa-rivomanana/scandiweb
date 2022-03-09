import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {productDeleteReducer, productListReducer, productSaveReducer} from './reducers/productReducers';
import {selectListReducer} from './reducers/selectReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';


const products = Cookie.getJSON("products") || [] ;
const selects = Cookie.getJSON("selects") || null ;

const initialState = {productList:{products},selectList:{selects}};
const reducer = combineReducers({
    selectList:selectListReducer,
    productList:productListReducer,
    productSave:productSaveReducer,
    productDelete:productDeleteReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
const store = createStore(reducer, initialState,composeEnhancer(applyMiddleware(thunk)));   
export default store;