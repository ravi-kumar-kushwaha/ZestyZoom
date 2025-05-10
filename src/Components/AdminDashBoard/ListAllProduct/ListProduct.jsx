import React, { useEffect } from 'react'
import axios from 'axios'
import CurrencyFormatter from '../../Utils/CurencyFormrter/CurrencyFormatter';
import './ListProduct.css'
import { Link } from 'react-router-dom';
const ListProduct = () => {
  const [data,setData] = React.useState([]);
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-all-foods`);
        console.log("response",response.data.data);
        if(response.data.success){
            console.log("food items fetched success fully!");
            setData(response.data.data);
        }else{
            alert("Something went wrong while fetching the food items" || response.data.message);
        }
      } catch (error) {
        console.log(error || error.message);
      }
    }
    fetchFoodItems();
  },[]);

  // const handleDeleteFood = async(id) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:1213/api/v1/user/delete-food/${id}`);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error || error.message);
  //   }
  // }

  const handleDelete = async(foodId)=>{
    console.log("foodId:",foodId);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/delete-food/${foodId}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      if(response.data.success){
        alert(response.data.message);
        window.location.reload();
      }else{
        alert(response.data.message);
      }
    } catch (error) {
      alert("Internal Server Error:",+error.message);
    } 
  }
  return (
    <div className="food-list" id='list-product'>
      <div className="all-food-items">
      <h1>All Food Items</h1>
      </div>
      <div className="all-food-items">
       {
        data.map((item) => {
          return (
            <div className="food-item" key={item._id}>
              <img src={item.image} alt="" />
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              {/* <p>Category : {item.category}</p>
              <p>Sub Category : {item.category2}</p> */}
              <p className="discount">Flat {item.discountPercentage}% Off</p>
              <div className="prices">
              <span className='price'>Price : {CurrencyFormatter.format(item.price)}</span>
              <span className="discounted-price">{CurrencyFormatter.format(item.discountedPrice)}</span>
              </div>  
              <div className='edit-delete-btn'>
                <Link to={`/admin/edit/${item._id}`}><button >Edit</button></Link>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>            
            </div>
          )
        })
       }
      </div>
    </div>
  )
}

export default ListProduct
