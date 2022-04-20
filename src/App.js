import React from "react";
import Main from "./components/Main";
import {Routes,Route} from 'react-router-dom'
import Allmenu from "./components/Allmenu";
import Admin from "./components/Admin";
import TopProduct from "./components/Admin/TopProduct";
import Navbar from "./components/Navbar";
import Signup from './../src/components/Adminlogin/Signup'
import Login from './../src/components/Adminlogin/Login'
import Cart from "./components/Cart";
import Razopay from "./components/Razopay";
import Orderpage from "./components/Orderpage";
import Orderdetails from "./components/Orderdetails";
import Track from "./components/Track";
import Order from "./components/Admin/Order";
import Query from '../src/components/Admin/Query'
function App() {
  return (
    <div className="App">
     <Routes>
       <Route path="/" element={<Main/>} />
         <Route path="/menu" element={<Allmenu/>} />
         <Route  path='/admin' element={<Admin/>} />
         <Route path="/top" element={<TopProduct />} />
         <Route path="/signup" element={<>
         <Navbar/>
         <Signup/>
         
         </>} />
         <Route path="/login" element={<>
         <Navbar/>
         <Login/>
         
         </>} />
         <Route path="/cart" element={<>
         <Navbar/>
         <Cart/>
         
         </>} />
         <Route path="/razo" element={<>
         <Navbar/>
         <Razopay/>
         
         </>} />
         <Route path="/myorder" element={<>
         <Navbar/>
         <Orderpage/>
         
         </>} />
         <Route path="/orderdetails" element={<>
         <Navbar/>
         <Orderdetails/>
         
         </>} />
         <Route path="/track/:id" element={<>
         <Navbar/>
         <Track/>
         
         </>} />
         <Route path="/orderdetail/:id" element={<>
         <Navbar/>
         <Orderdetails/>
         
         </>} />
         <Route path="/adminorder" element={<>
         {/* <Navbar/> */}
         <Order/>
         
         </>} />
         <Route path="/query" element={<>
         {/* <Navbar/> */}
         <Query/>
         
         </>} />
     </Routes>
     
      
    </div>
  );
}

export default App;
