import React, { useEffect, useState } from "react";
import "./AllProducts.css";
import Axios from "../Axios/Axios";
import { useNavigate } from "react-router-dom";
const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const { data } = await Axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cnt">
      <div className="cards">
        <table id="productTable">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Images</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={i}>
                <td>{product.product_name}</td>
                <td>
                  <img
                    src={"http://localhost:4000" + product.product_images[0]}
                    alt=""
                  />
                </td>
                <td>{product.product_category}</td>
                <td>{product.product_subcategory}</td>
                <td>{product.product_brand}</td>
                <td className="btn-cnt">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/product/edit/${product._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
