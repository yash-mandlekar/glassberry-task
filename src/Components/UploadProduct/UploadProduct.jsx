import React, { useEffect, useState } from "react";
import "./UploadProduct.css";
import MyDropzone from "../DropZone/DropZone";
import axios from "../Axios/Axios";
const UploadProduct = () => {
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
    if (product_category === "") setsubcategories([]);
    else setsubcategories(categories[product_category]);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("product_name", product_name);
    formData.append("product_features", product_features);
    formData.append("product_description", product_description);
    formData.append("product_category", product_category);
    formData.append("product_subcategory", product_subcategory);
    formData.append("product_brand", product_brand);
    formData.append("product_publish_date", product_publish_date);

    for (let i = 0; i < file.length; i++) {
      if (file[i] !== null) {
        formData.append("file", file[i]);
      }
    }

    try {
      const { data } = await axios.post("/products", formData, config);
      if (data) {
        alert("Product Uploaded Successfully");
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
          <MyDropzone index={0} setfile={setfile} file={file[0]} />
          <MyDropzone index={1} setfile={setfile} file={file[1]} />
          <MyDropzone index={2} setfile={setfile} file={file[2]} />
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
            <option value="Mobile">Mobiles, Computers</option>
            <option value="Laptop">TV, Electronics</option>
            <option value="Mens">Men's Fashion</option>
            <option value="Womens">Women's Fashion</option>
          </select>
          <select
            name="product_subcategory"
            id="product_subcategory"
            required
            disabled={product_category ? false : true}
            onChange={hanldleOnchange}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => {
              return (
                <option value={subcategory} key={subcategory}>
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
            value={product_publish_date}
          />
        </div>
        <div className="form-group">
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
