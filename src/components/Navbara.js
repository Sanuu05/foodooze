import React, { useEffect, useState } from 'react'
import cake1 from '../components/images/cake7.png'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, getTop, postQuery } from '../action/product'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import {getcart, nlogout} from '../action/user'
import Pusher from 'pusher-js'
function Navbara() {
    const dispatch = useDispatch()
    const [resdata, setresdata] = useState()
    const [del, setdel] = useState()
    const [edit, setitem] = useState()
    const [data, setdata] = useState({
        name: "", mobile: "", email: "", messages: ""
    })
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(postQuery(data))
        setdata({
            name: "", mobile: "", email: "", messages: ""
        })
    }
    const usertoken = localStorage.getItem('normaltoken')
    const cartdata = useSelector(state=>state.cart.allcart)
    const upd = useSelector((state) => state.acart.add)
    const totalItem = () => {
        return cartdata.reduce((qty, item) => Number(item.qyt) + qty, 0)
    }
    
    // const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getcart())
    },[upd,usertoken])
    useEffect(() => {
        const pusher = new Pusher('dd6db006f4dad11b7fe7', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('product');
        channel.bind('inserted', function (data) {
            setresdata(JSON.stringify(data));
        });
        const channels = pusher.subscribe('products');
        channels.bind('deleted', function (data) {
            setdel(JSON.stringify(data));
        });
        const channel1 = pusher.subscribe('prod');
        channel1.bind('updated', function (data) {
            setitem(JSON.stringify(data));
        });

    })
    useEffect(() => {
        dispatch(getProduct())
    }, [resdata, del, edit, dispatch])
    useEffect(() => {
        dispatch(getTop())
    }, [])
    const product = useSelector(state => state.product)
    const top = useSelector(state => state.top)
    const token = useSelector((state)=>state?.normal?.token)
    console.log(top)
    return (
        <div className="mbody">
            <div className="navbarr">
                <div className="upper_nav">

                    <div className="container bnav">
                        <div className="upper_nav_first">
                            <i class="fab fa-facebook-square"></i>
                            <i class="fab fa-instagram"></i>
                            <i class="fab fa-twitter-square"></i>
                        </div>
                        <div className="upper_nav_right">
                           {
                               token?<a href="#" onClick={()=>dispatch(nlogout())} >Logout</a>:
                               <a href="/login" >Login</a>
                           }   | <a href="/cart"><i class="fas fa-shopping-cart"><span>{cartdata?.length}</span></i> Cart</a>
                           | <a href='myorder'>My Order</a>

                        </div>
                    </div>

                </div>
                <div className="lower_nav ">
                    <nav class="navbar shadow navbar-expand-lg navbar-light bg-light">
                        <div class="container">
                            <a class="navbar-brand" href="/">CakeWorld</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                                <ul class="navbar-nav ">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                                    </li>

                                    <li class="nav-item">
                                        <a class="nav-link" href="/#topitem">TopProduct</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/#about">About</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/#top_pdt">Product</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/#contact">Contact</a>
                                    </li>



                                </ul>

                            </div>
                        </div>
                    </nav>
                </div>
             

            </div>

        </div>
    )
}

export default Navbara
