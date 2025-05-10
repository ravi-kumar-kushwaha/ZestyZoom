import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditFoodItem.css";
const EditFoodItem = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    image: null, 
    imageUrl: "",
    price: "",
    discountPercentage: "",
    totalQuantity: "",
    category: "",
    category2: "",
  });

  const params = useParams();
  const foodId = params.id;

  
  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/get-food/${foodId}`
        );
        if (response.data.success) {
          const foodData = response.data.data;
          setData({
            name: foodData.name,
            description: foodData.description,
            image: null, 
            imageUrl: foodData.image, 
            price: foodData.price,
            discountPercentage: foodData.discountPercentage,
            totalQuantity: foodData.totalQuantity,
            category: foodData.category,
            category2: foodData.category2,
          });
        } else {
          alert(response.data.message || "Error fetching food item.");
        }
      } catch (error) {
        alert("Internal Server Error: " + error.message);
      }
    };

    fetchFoodItem();
  }, [foodId]);

  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setData((prevData) => ({
        ...prevData,
        image: files[0], 
        imageUrl: URL.createObjectURL(files[0]),
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("discountPercentage", data.discountPercentage);
      formData.append("totalQuantity", data.totalQuantity);
      formData.append("category", data.category);
      formData.append("category2", data.category2);

      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/update-foodItem/${foodId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response", response.data.data);
      if (response.data.success) {
        alert(response.data.message);
        window.location.href = "/admin/list-product";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Internal Server Error: " + error.message);
    }
  };

  return (
    <div className="edit-food-item-container">
      <div className="edit-food-item">
        <h1>Edit Food Item</h1>
      </div>
      <div className="edit-food-item-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={data.description}
            onChange={handleChange}
          />
          {data.imageUrl && (
            <div>
              <img
                src={data.imageUrl}
                alt="Existing Food Item"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}

          <input type="file" name="image" onChange={handleChange} accept="image/*" required/>

          <input
            type="number"
            name="price"
            placeholder="Enter the Price"
            value={data.price}
            onChange={handleChange}
          />
          <input
            type="number"
            name="discountPercentage"
            placeholder="Enter Discount Percentage"
            value={data.discountPercentage}
            onChange={handleChange}
          />
          <input
            type="number"
            name="totalQuantity"
            placeholder="Total Quantity"
            value={data.totalQuantity}
            onChange={handleChange}
          />
          <select name="category" value={data.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="drinks">Drinks</option>
            <option value="snacks">Snacks</option>
          </select>
          <select name="category2" value={data.category2} onChange={handleChange}>
            <option value="">Select Category 2</option>
            <option value="burgers & sandwiches">Burgers & Sandwiches</option>
            <option value="pizza">Pizza</option>
            <option value="chinese & indo-chinese">Chinese & Indo-Chinese</option>
            <option value="north-indian">North Indian</option>
            <option value="south-indian">South Indian</option>
            <option value="biryani & rice">Biryani & Rice</option>
            <option value="fast-food">Fast Food</option>
            <option value="desserts & ice cream">Desserts & Ice Cream</option>
            <option value="street-food">Street Food</option>
            <option value="healthy & salad">Healthy & Salad</option>
            <option value="sushi & japanese">Sushi & Japanese</option>
            <option value="grilled & bbq">Grilled & BBQ</option>
            <option value="pasta & italian">Pasta & Italian</option>
            <option value="seafood">Seafood</option>
            <option value="drinks & beverages">Drinks & Beverages</option>
            <option value="thalis & combo">Thalis & Combo Meals</option>
            <option value="tandoori & kebabs">Tandoori & Kebabs</option>
            <option value="snacks & sides">Snacks & Sides</option>
            <option value="chinese">Chinese</option>
            <option value="italian">Italian</option>
            <option value="indian">Indian</option>
            <option value="french">French</option>
          </select>
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditFoodItem;
