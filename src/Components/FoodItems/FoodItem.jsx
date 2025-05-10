import React from 'react'
import FoodList from './FoodList';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const FoodItem = () => {
    const [foodItems, setFoodItems] = useState([]);
   useEffect( () => {
    const fetchFoodItems = async () => {
       try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-all-foods`);
        // console.log("response",response.data.data);
        if(response.data.success){
            console.log("food items fetched success fully!");
            setFoodItems(response.data.data);
        }else{
            alert("Something went wrong while fetching the food items" || response.data.message);
        }
       } catch (error) {
        alert("Internal Server Error:",+error.message);
       }
    }
    fetchFoodItems();
   },[])
  return (
    <div>
      <FoodList foodItems={foodItems}/>
    </div>
  )
}

export default FoodItem
