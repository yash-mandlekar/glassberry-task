import React, { useEffect, useState } from "react";
import "./SingleProduct.css";
import { useParams } from "react-router-dom";
import Axios from "../Axios/Axios";
const SingleProduct = () => {
  const { id } = useParams();
  const [productImg, setproductImg] = useState(
    "http://localhost:4000/images/1684566271249-feed4.jpg"
  );
  const [product, setproduct] = useState(null);
  const fetchProduct = async () => {
    try {
      const { data } = await Axios.get(`/products/${id}`);
      console.log(data);
      setproduct(data);
      setproductImg("http://localhost:4000" + data.product_images[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);
  return (
    <div className="cnt">
      <div className="product-details">
        <div className="product-left">
          <h2 className="product-name">{product?.product_name}</h2>
          <div className="product-info">
            <h3 className="section-title">Product Features</h3>
            <p className="product-features">{product?.product_features}</p>

            <h3 className="section-title">Product Description</h3>
            <div className="product-description">
              {product?.product_description}
            </div>

            <h3 className="section-title">Category</h3>
            <p className="product-category">{product?.product_category}</p>

            <h3 className="section-title">Subcategory</h3>
            <p className="product-subcategory">{product?.product_subcategory}</p>

            <h3 className="section-title">Brand</h3>
            <p className="product-brand">{product?.product_brand}</p>

            <h3 className="section-title">Publish Date</h3>
            <p className="product-publish-date">{product?.product_publish_date?.slice(0, 10)}</p>
          </div>
        </div>
        <div className="product-right">
          <div className="product-images">
            <img
              className="product-image"
              src={productImg}
              alt="Product Image"
            />
          </div>
          <div className="mini-imgs">
            {product?.product_images?.map((img, i) => (
              <img
                key={i}
                onClick={() => setproductImg("http://localhost:4000" + img)}
                className="mini-img"
                src={"http://localhost:4000" + img}
                alt="Product Image"
                style={{
                  border:
                    productImg === "http://localhost:4000" + img &&
                    "1px solid blue",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
