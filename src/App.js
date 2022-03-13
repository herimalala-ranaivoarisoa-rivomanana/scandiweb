import React from 'react'
import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ListProduct from './components/ListProduct';
import {useDispatch } from "react-redux";
import { listProducts } from "./redux/actions/productActions";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <div className="App"> 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;