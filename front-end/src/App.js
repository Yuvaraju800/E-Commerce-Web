
import './App.css';
import Nav from './Components/Nav'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Footer from './Components/Footer'
import Signup from "./Components/Signup"
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
     <Nav/>
     <Routes>
     <Route element={<PrivateComponent/>}/>
     <Route path="/" element={<ProductList/>}/>
     <Route path="/Add" element={<AddProduct />}/>
     <Route path="/Update/:id" element={<UpdateProduct/>}/>
     <Route path="/Logout" element={<h1>Logout User</h1>}/>
     <Route path="/Profile" element={<h1> Progile Changes</h1>}/>
     <Route/>
     <Route path="/Signup" element={<Signup/>}/>
     <Route path="/login" element={<Login/>}/>
     </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
