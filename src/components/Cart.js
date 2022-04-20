import React, { useEffect } from 'react'
// import img from './images/photo7.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { getcart, delCart } from '../action/user'
import { addtocart } from './../action/user'
import { NavLink } from 'react-router-dom'
import cart from '../reducers/cart'
import { MdClear } from "react-icons/md";
import { BiChevronsLeft } from "react-icons/bi";
function Cart() {
    const dispatch = useDispatch()
    const delcartitem = useSelector((state) => state.acart.del)
    const cartqytup = useSelector((state) => state.acart.del)
    const allcdel = useSelector((state) => state.acart.cdel)
    const cartdata = useSelector(state => state.cart.allcart)
    useEffect(() => {
        dispatch(getcart())
    }, [ cartdata, dispatch])
    // const cartdata = useSelector(state => state.cart.allcart)
    const gettotal = () => {
        return cartdata?.reduce((price, item) => (item.price * item.qyt) + price, 0)
    }
    const del = (data) => {

        dispatch(delCart(data))



    }
    // console.log('ckl',cartdata)

    return (
        <div className="cart">
            <div className="container">
                <div className="row">
                    <div className="mx-md-4 ">
                        <h2 className="mx-5 carthead">Food Cart</h2>
                    </div>

                    <div className="col-md-8 col-12 cart-left">
                        <div className="row">
                            {
                                cartdata ?
                                    cartdata.map((val, i) => {
                                        return <div className="col-12 col-md-10 col-xl-10 offset-0 offset-md-1 offset-xl-1 cartsub  my-2">
                                            <div className="row w-100">
                                                <div className="col-4 col-md-4 col-xl-4 ">
                                                    <div className="cart_img">
                                                        <img src={val?.pimg} className="img-fluid" />
                                                    </div>
                                                </div>
                                                <div className="col-8 col-md-8 col-xl-8 cart-detail">
                                                    <div className='cdiv'>
                                                        <h3>{val?.cath}</h3>
                                                        <h2>{val?.pname}</h2>
                                                    </div>

                                                    <div className="cdiv">

                                                        <select value={val?.qyt} onChange={(e) => dispatch(addtocart({ cart: { cartitem: val?.cartitem,cath:val?.cath, pimg: val?.pimg, pname: val?.pname, stock: val?.stock, price: val?.price, qyt: e.target.value } }))} >
                                                            {
                                                                [...Array(Number(val?.stock)).keys()].map((x) => {
                                                                    return <option value={x + 1}>{x + 1}</option>
                                                                })
                                                            }
                                                        </select>



                                                    </div>
                                                    <div className="cdiv">
                                                        <h4>₹{val?.price}</h4>
                                                    </div>

                                                    <div className="cdiv">
                                                        <button onClick={() => del(val?.cartitem)}><MdClear /></button>
                                                    </div>


                                                </div>
                                            </div>



                                        </div>
                                    }) : null
                            }

                            <NavLink className="mx-md-5 mb-5 backlink" to="/" ><BiChevronsLeft/> Continue Shopping </NavLink>
                        </div>


                    </div>
                    <div className="col-md-4 col-12 cart-right">
                        {
                            cartdata.length ? <div className="card shadow">

                                <div className="price_detail">
                                    <h2>PRICE DETAILS</h2>
                                </div>
                                <div className="total_price">
                                    <div className="d-flex justify-content-between">
                                        <p>Price({cartdata.length} item)</p>
                                        <p>₹{gettotal()?.toFixed(2)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>CGST : </p>
                                        <p>₹{(gettotal() * 0.025)?.toFixed(2)}  </p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>SGST : </p>
                                        <p>₹{(gettotal() * 0.025)?.toFixed(2)}  </p>
                                    </div>


                                    <h3>Total : ₹{(gettotal() + (gettotal() * 0.05))?.toFixed(2)}</h3>
                                </div>
                                <div className="buy_btn">
                                    <NavLink to="/razo">
                                        <button>Proceed To Buy</button>

                                    </NavLink>

                                </div>
                            </div> : null
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
