import React,{useState,useEffect}from 'react';
import {Link} from 'react-router-dom';

const ProductList = () => {

    const [products,setProducts]=React.useState([]);
    useEffect(()=>{
        getProducts();
        },[]);
        const getProducts=async ()=>{
            let result= await fetch("/product-list",{
              headers:{
                authorization:JSON.parse(localStorage.getItem("token"))
              }
            });

            result=await result.json();
            setProducts(result);
        }
        // console.warn("products",products);
        const deleteProduct=async (id)=>{
           let result= await fetch(`/product/${id}`,{
                method:"DELETE"

            });
           result =await result.json();
           if(result){
               alert("record is deleted")
           }
        };
        const searchHandle=async(event)=>{
            console.warn(event.target.value);
            let key=event.target.value;
            if(key){
              let result=await fetch(`/search/${key}`);
              result=await result.json();
              if(result){
                  setProducts(result);
              }
            }else{
                getProducts();
            }
           
        }
  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input  type="text" className="search-product-box" placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul>
      <li>S. No</li>
      <li>Name</li>
      <li>Price</li>
      <li>Category</li>
      <li>Company</li>
      <li>Operation</li>
      </ul>
      {
        products.length>0 ? products.map((item,index)=>
      <ul key={item._id}>
      <li>{index+1}</li>
      <li>{item.name}</li>
      <li>${item.price}</li>
      <li>{item.category}</li>
      <li>{item.company}</li>
      <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
      <Link to={"/update/"+item._id}>Update</Link>
      </li>
      </ul>
        )
        :<h3>No Product Found</h3>
      }
     
    </div>
  )
}

export default ProductList
