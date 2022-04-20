import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { getcart, nlogout } from '../action/user'
import Pusher from 'pusher-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Navbar() {
  const token = useSelector((state) => state?.normal?.token)
  const dispatch = useDispatch()
  const cartdata = useSelector(state => state.cart.allcart)
  const[resdata,setresdata] = useState()
  useEffect(() => {
    dispatch(getcart())
  }, [resdata])
  useEffect(() => {
    const pusher = new Pusher('acaefd0f6ede12677278', {
        cluster: 'ap2'
    });

    const channel = pusher.subscribe('cart');
    channel.bind('inserted', function (data) {
        setresdata(JSON.stringify(data));
        // alert(JSON.stringify(data))
        // toast.success("Foodcart Updated")
       
    });
    const channels = pusher.subscribe('carts');
    channels.bind('deleted', function (data) {
        setresdata(JSON.stringify(data));
        // toast.success("Foodcart Updated")
        
        
    });
    const channel1 = pusher.subscribe('cartd');
    channel1.bind('updated', function (data) {
        setresdata(JSON.stringify(data));
        // toast.success("Foodcart Updated")
        
    });
    
},[])

  return (
    <div>
      <div class="wrapper">
        <nav>
          <input type="checkbox" id="show-search" />
          <input type="checkbox" id="show-menu" />
          <label for="show-menu" class="menu-icon"><i class="fas fa-bars"></i></label>
          <div class="content">
            <div class="logo"><a href="/">Foodooze</a></div>
            <ul class="links">
              <li><a href="/#">Home</a></li>
              <li><a href="/#about">About</a></li>
              <li>
                <a href="/#service" class="desktop-link">Services</a>
                <input type="checkbox" id="show-features" />
                <label for="show-features">Services</label>
                <ul>
                  <li><a href='/#service'>Drop Menu 1</a></li>
                  <li><a href='/#service'>Drop Menu 2</a></li>
                  <li><a href='/#service'>Drop Menu 3</a></li>
                  <li><a href='/#service'>Drop Menu 4</a></li>
                </ul>
              </li>
              <li>
                <a href='/#menu' class="desktop-link">Menu</a>
                <input type="checkbox" id="show-services" />
                <label for="show-services">Menu</label>
                <ul>
                  <li><a href='/#menu'>Drop Menu 1</a></li>
                  <li><a href='/#menu'>Drop Menu 2</a></li>
                  <li><a href='/#menu'>Drop Menu 3</a></li>
                  <li>
                    <a href='/#menu' class="desktop-link">More Items</a>
                    <input type="checkbox" id="show-items" />
                    <label for="show-items">More Items</label>
                    <ul>
                      <li><a href='/#menu'>Sub Menu 1</a></li>
                      <li><a href='/#menu'>Sub Menu 2</a></li>
                      <li><a href='/#menu'>Sub Menu 3</a></li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li><a href="/#book">Book a Table</a></li>
            </ul>
            <div className='navlog'>
              {/* <label for="show-search" class="search-icon"><i class="fas fa-search"></i></label> */}
              {/* {
                token ?
                  <RiLogoutCircleRFill onClick={() => dispatch(nlogout())} />
                  :
                  <NavLink to="/login" >
                    <FaUserAlt />

                  </NavLink>
              } */}
              {
                token?<div class="dropdown">
                <button class="dropbtn"><FaUserAlt/></button>
                <div class="dropdown-content">
                  <a href="/myorder">My Orders</a>
                  <a onClick={()=>dispatch(nlogout())}>Logout</a>
                  <a href="#">Link 3</a>
                </div>
              </div>:<NavLink className="dropbtn" to="/login" >
                Login

              </NavLink>
              }
              

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <NavLink to="/cart" >
                  <i class="fas fa-shopping-cart"> </i>

                </NavLink>

                <p style={{ fontWeight: 'bold' }} >{cartdata?.length}</p>
              </div>

            </div>

          </div>

          <form action="#" class="search-box">
            {/* <input type="text" placeholder="Type Something to Search..." required /> */}
            {/* <button type="submit" class="go-icon"><i class="fas fa-long-arrow-alt-right"></i></button> */}
          </form>
        </nav>
      </div>
      <ToastContainer/>

    </div>
  )
}

export default Navbar
