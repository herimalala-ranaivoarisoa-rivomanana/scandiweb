import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ListProduct from './components/ListProduct';

function App() {
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