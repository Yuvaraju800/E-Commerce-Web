import React, { useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';
const Nav=()=>{
    const auth=localStorage.getItem("user");
    const navigate=useNavigate();
    
    //logout function
   const  logout=(e)=>{
    console.warn("Logout");
    localStorage.clear();
    navigate("/Signup");
   }
    return(
        <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVu1-Uy-DRBVDaYQFcmH197c6ATJNBw0lsig&s" alt="Logo" className="logo" />
           { auth ?  <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add"> Add Product</Link></li>
                <li><Link to="/update"> Update Product</Link></li>
                <li><Link to="/Profile"> Profile</Link></li>
                <li><Link onClick={logout} to="/Signup"> Logout({JSON.parse(auth).name})</Link></li>

    
            </ul>
            :
            <ul className="nav-ul nav-right">
            <li className="signup"><Link to="/Signup"><button>SignUp</button></Link></li>
            <li className="signup"><Link to="/login"><button>Login</button></Link></li>
            </ul>
           }
        </div>
    )
}
export default Nav;