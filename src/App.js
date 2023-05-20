import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllProducts from "./Components/AllProducts/AllProducts";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import Navbar from "./Components/Navbar/Navbar";
import UploadProduct from "./Components/UploadProduct/UploadProduct";
import EditProduct from "./Components/EditProduct/EditProduct";
const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<AllProducts />} />
        <Route path="upload" element={<UploadProduct />} />
        <Route path="product/:id" element={<SingleProduct />} />
        <Route path="product/edit/:id" element={<EditProduct />} />
      </Route>
      <Route path="/*" element={<>not found</>} />
    </Routes>
  );
};

export default App;
