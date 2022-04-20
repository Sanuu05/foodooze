import React, { useEffect } from 'react'
import img from './img/img3.jpg'
import img1 from './img/food1.jpg'
import img2 from './img/food7.jpg'
import img3 from './img/food3.jpg'
import img4 from './img/food4.jpg'
import img5 from './img/food5.jpg'
import { MdRestaurantMenu, MdAdsClick } from "react-icons/md";
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { getProduct } from '../action/product'
import { useDispatch, useSelector } from 'react-redux'
// const list = [img,img1,img2,img3,img4,img5] 
import { FaCartPlus } from "react-icons/fa";
import { addtocart } from '../action/user'
import { GoPrimitiveDot} from "react-icons/go";
const list = [
    {
        name: "Mushrrom Curry",
        price: 400,
        img: img
    },
    {
        name: "Pizza",
        price: 550,
        img: img1
    },
    {
        name: "Bread Egg",
        price: 200,
        img: img2
    },
    {
        name: "Rice & Curry",
        price: 400,
        img: img3
    },
    {
        name: "Burger",
        price: 300,
        img: img4
    },
    {
        name: "Cinnamon pancakes",
        price: 300,
        img: img5
    }

]


function Mainmenu({ title , data}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProduct())
    }, [])
    const product = useSelector(state => state.product)
    const history = useNavigate()
    const usertoken = localStorage.getItem('normaltoken')

    return (
        <div className='menu'>
            <div className='container'>
                <div className='row px-5'>
                    <div className='title'>
                        <h2>{title}</h2>
                    </div>
                    <div className='titlebelow'>
                        <p>Consectetur numquam poro nemo veniam <br />
                            eligendi rem adipisci quo modi.</p>
                        {/* <button className='btntwo'><MdRestaurantMenu />Full Menu</button> */}

                    </div>
                    {
                        data?.map((v, i) => {
                            return <div className='col-xl-3 col-md-4 col-12 my-3 '>
                                <div className='cardx'>
                                    <div className='cardximg'>
                                        <img src={v?.productimg} className='img-fluid' />
                                        <button onClick={v?()=>usertoken? dispatch(addtocart({ cart: { cartitem: v?._id, pimg: v?.productimg, pname: v?.name, stock: v?.stock,cath:v?.cath ,price: v?.price, qyt: 1 } })):history('/login'):null}><FaCartPlus/></button>
                                        <GoPrimitiveDot className= {v?.nveg?'nveg':'veg'}/>
                                    </div>
                                    

                                    <div className='below'>
                                        <h3>{v?.name}</h3>
                                        <h4>₹{v?.price}</h4>
                                    </div>
                                    <p>
                                      {v?.des}</p>

                                </div>

                            </div>
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default Mainmenu
