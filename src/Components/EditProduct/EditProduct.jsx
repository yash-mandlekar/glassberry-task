import React, { useEffect, useState } from "react";
import "../UploadProduct/UploadProduct.css";
import MyDropzone from "../DropZone/DropZone";
import axios from "../Axios/Axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  var categories = {
    Mobile: [
      "All Mobile Phones",
      "All Mobile Assesories",
      "Smart Watches",
      "Bluetooth Headsets",
      "Mobile Cases",
      "Screen Protectors",
      "Power Banks",
      "Mobile Chargers",
      "Memory Cards",
      "Mobile Holders",
      "Selfie Sticks",
      "Mobile Cables",
      "VR Headsets",
    ],
    Laptop: [
      "Laptops",
      "Gaming Laptops",
      "Macbooks",
      "Printers",
      "Routers",
      "Networking",
      "Hard Drives",
      "Flash Drives",
      "Memory Cards",
      "Graphics Cards",
      "Motherboards",
      "Processors",
      "Power Supplies",
      "Computer Cases",
      "Monitors",
      "Keyboards",
      "Mouse",
      "Mousepads",
      "Headphones",
      "Speakers",
      "Webcams",
      "Cooling Pads",
      "Laptop Skins",
      "Laptop Bags",
      "Cables",
      "Adapters",
      "Batteries",
      "Chargers",
      "Docking Stations",
      "Laptop Stands",
    ],
    Mens: ["Clothing", "T-shirts", "Shirts", "Jeans", "Innerwear", "Watches"],
    Womens: [
      "Clothing",
      "Western Wear",
      "Ethnic Wear",
      "Night wear",
      "Top Brands",
    ],
  };
  const [form, setform] = useState({
    product_name: "",
    product_features: "",
    product_description: "",
    product_category: "",
    product_subcategory: "",
    product_brand: "",
    product_publish_date: "",
  });
  const [subcategories, setsubcategories] = useState([]);
  const {
    product_name,
    product_features,
    product_description,
    product_category,
    product_subcategory,
    product_brand,
    product_publish_date,
  } = form;
  const [file, setfile] = useState([null, null, null]);
  const hanldleOnchange = (e) => {
    setform((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (e.target.name === "product_category") {
      if (e.target.value === "") {
        setsubcategories([]);
        return;
      } else {
        setsubcategories(categories[e.target.value]);
      }
    }
  };
  useEffect(() => {
    if (id) {
      fetchProduct();
    }
    if (product_category === "") setsubcategories([]);
    else setsubcategories(categories[product_category]);
  }, [id]);
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setform(data);
      setfile(data.product_images);
      setsubcategories(categories[data.product_category]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/products/${id}`, form);
      if (data) {
        alert("Product Updated Successfully");
        setform({
          product_name: "",
          product_features: "",
          product_description: "",
          product_category: "",
          product_subcategory: "",
          product_brand: "",
          product_publish_date: "",
        });
        setfile([null, null, null]);
        navigate("/")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cnt">
      <h2 className="heading">Upload Your Product</h2>
      <form onSubmit={handleSubmit} className="form-cnt">
        <div className="form-group">
          <input
            placeholder="Product Name"
            type="text"
            name="product_name"
            id="product_name"
            onChange={hanldleOnchange}
            value={product_name}
            required
          />
          <input
            placeholder="Product Features"
            type="text"
            name="product_features"
            id="product_features"
            onChange={hanldleOnchange}
            value={product_features}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Product Description"
            type="text"
            name="product_description"
            id="product_description"
            onChange={hanldleOnchange}
            value={product_description}
            required
          />
        </div>
        <div className="form-group">
          {file.map((single, i) => (
            <div className="dropzone" key={i}>
              <img src={single} alt="product" className="preview-img" />
            </div>
          ))}
        </div>
        <div className="form-group">
          <select
            name="product_category"
            id="product_category"
            required
            onChange={hanldleOnchange}
            defaultValue={product_category}
          >
            <option value="">Select Category</option>
            <option selected={product_category === "Mobile"} value="Mobile">
              Mobiles, Computers
            </option>
            <option selected={product_category === "Laptop"} value="Laptop">
              TV, Electronics
            </option>
            <option selected={product_category === "Mens"} value="Mens">
              Men's Fashion
            </option>
            <option selected={product_category === "Womens"} value="Womens">
              Women's Fashion
            </option>
          </select>
          <select
            name="product_subcategory"
            id="product_subcategory"
            required
            disabled={product_category ? false : true}
            onChange={hanldleOnchange}
            defaultValue={product_subcategory}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => {
              return (
                <option
                  value={subcategory}
                  key={subcategory}
                  selected={subcategory === product_subcategory}
                >
                  {subcategory}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <input
            placeholder="Product Brand"
            type="text"
            name="product_brand"
            id="product_brand"
            required
            onChange={hanldleOnchange}
            value={product_brand}
          />
          <input
            placeholder="Product Publish_date"
            type="date"
            name="product_publish_date"
            id="product_publish_date"
            required
            onChange={hanldleOnchange}
            value={product_publish_date.slice(0, 10)}
          />
        </div>
        <div className="form-group">
          <button className="submit-btn" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
