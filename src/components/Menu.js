import React, { useEffect, useState } from 'react'
import img from './img/img3.jpg'
import img1 from './img/food1.jpg'
import img2 from './img/food7.jpg'
import img3 from './img/food3.jpg'
import img4 from './img/food4.jpg'
import img5 from './img/food5.jpg'
import { MdRestaurantMenu, MdAdsClick } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getTop } from '../action/product'
import { FaCartPlus } from "react-icons/fa";
import { addtocart } from '../action/user'
import { GoPrimitiveDot} from "react-icons/go";
import Pusher from 'pusher-js'
// const list = [img,img1,img2,img3,img4,img5] 
const list =[
    {
        name:"Mushrrom Curry",
        price:400,
        img:img
    },
    {
        name:"Pizza",
        price:550,
        img:img1
    },
    {
        name:"Bread Egg",
        price:200,
        img:img2
    },
    {
        name:"Rice & Curry",
        price:400,
        img:img3
    },
    {
        name:"Burger",
        price:300,
        img:img4
    },
    {
        name:"Cinnamon pancakes",
        price:300,
        img:img5
    }
    
]

function Menu() {
    const dispatch = useDispatch()
    const top = useSelector(state=>state.top)
    console.log('top',top)
    const product = useSelector(state => state.product)
    const history = useNavigate()
    const usertoken = localStorage.getItem('normaltoken')
    const[resdata,setresdata] = useState()
    useEffect(() => {
        dispatch(getTop()) 
    }, [resdata])
    
    useEffect(() => {
        const pusher = new Pusher('acaefd0f6ede12677278', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('tpdt');
        channel.bind('tpdtinsrt', function (data) {
            setresdata(JSON.stringify(data));
            // alert(JSON.stringify(data))
           
        });
        const channels = pusher.subscribe('deltpdt');
        channels.bind('deltpdtinsrt', function (data) {
            setresdata(JSON.stringify(data));
            
        });
        // const channel1 = pusher.subscribe('prod');
        // channel1.bind('updated', function (data) {
        //     setitem(JSON.stringify(data));
            
        // });
        
    },[])
    
    

    return (
        <div className='menu' id='menu'>
            <div className='container'>
                <div className='row px-5'>
                    <div className='title'>
                        <h2>Most popular dishes</h2>
                    </div>
                    <div className='titlebelow'>
                        <p>Consectetur numquam poro nemo veniam <br />
                            eligendi rem adipisci quo modi.</p>
                        <NavLink to="/menu"> <button className='btntwo'><MdRestaurantMenu />Full Menu</button></NavLink>

                    </div>
                    {
                        top?.map((v, i) => {
                            return <div className='col-md-4 col-12 my-3 '>
                                <div className='cardxx'>
                                    <div className='cardimg'>
                                        <div className='cardximg'>
                                        <img src={v?.top?.productimg} className='img-fluid' />
                                        <button onClick={v?.top?()=>usertoken? dispatch(addtocart({ cart: { cartitem: v?.top?._id, pimg: v?.top?.productimg, pname: v?.top?.name, stock: v?.top?.stock,cath:v?.top?.cath ,price: v?.top?.price, qyt: 1 } })):history('/login'):null}><FaCartPlus/></button>
                                        <GoPrimitiveDot className= {v?.top?.nveg?'nveg':'veg'}/>
                                            </div>
                                        
                                    </div>

                                    <div className='below'>
                                        <h3>{v?.top?.name}</h3>
                                        <h4>₹{v?.top?.price}</h4>
                                    </div>
                                    <p>
                                        tomatoes, nori, feta cheese, mushrooms, rice noodles, corn, shrimp.</p>

                                </div>

                            </div>
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default Menu
