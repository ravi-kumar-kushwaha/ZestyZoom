import React from 'react';
import './AddFoodItem.css';
import axios from 'axios';

const AddFoodItem = () => {
    const [data, setData] = React.useState({
        name: "",
        description: "",
        image: null,  
        price: "",
        discountPercentage: "",
        totalQuantity: "",
        category: "",
        category2: "",
    });

    // console.log("data", data);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === "file") {
            setData({ ...data, image: e.target.files[0] });  
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.name || !data.description || !data.image || !data.price || !data.discountPercentage || !data.totalQuantity || !data.category || !data.category2) {
            alert("Please fill in all required fields.");
            return;
        }

        const discountedPrice = (data.price - ((data.discountPercentage * data.price) / 100)).toFixed(2);

        // Creating FormData object
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("image", data.image); 
        formData.append("price", data.price);
        formData.append("discountPercentage", data.discountPercentage);
        formData.append("discountedPrice", discountedPrice);
        formData.append("totalQuantity", data.totalQuantity);
        formData.append("category", data.category);
        formData.append("category2", data.category2);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/add-food`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // console.log("response", response);
            if (response.data.success) {
                alert("Food Item Added Successfully");
                setData({
                    name: "",
                    description: "",
                    image: null, 
                    price: "",
                    discountPercentage: "",
                    totalQuantity: "",
                    category: "",
                    category2: "",
                });
            } else {
                alert("Something went wrong while adding the food item.");
            }
        } catch (error) {
            console.error("Axios Error:", error);
            alert("Internal Server Error: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className='add-food-item'>
            <div className="add-food">
                <h1>Add Food Item</h1>
            </div>
            <div className="add-food-item-form">
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
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                    />
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
                    <select
                        name="category"
                        value={data.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-Veg</option>
                        <option value="drinks">Drinks</option>
                        <option value="snacks">Snacks</option>
                    </select>
                    <select
                        name="category2"
                        value={data.category2}
                        onChange={handleChange}
                    >
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
                        <option value="pasta &italian">Pasta & Italian</option>
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
                    <button type='submit'>Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddFoodItem;





{/* {data.sizes.map((size, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="sizeName"
                                placeholder={`Size ${index + 1}`}
                                value={size.sizeName}
                                onChange={(e) => handleSizeChange(index, e)}
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={size.price}
                                onChange={(e) => handleSizeChange(index, e)}
                            />
                        </div>
                    ))}
                    <button type="button" className='add-size' onClick={handleAddSize}>Add Size And Quantity</button> */}