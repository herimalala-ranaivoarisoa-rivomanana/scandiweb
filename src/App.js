import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ListProduct from './components/ListProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<ListProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;