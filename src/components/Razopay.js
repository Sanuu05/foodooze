import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getcart } from '../action/user';
import { useNavigate } from 'react-router-dom'
import { deleted } from '../action/user'

function Razopay() {
    const [succmsg, setsuccmsg] = useState()
    const dispatch = useDispatch()
    const [discount, setdiscount] = useState(0)
    const [cinput, csetinput] = useState()
    const allcdel = useSelector((state) => state.acart.cdel)
    useEffect(() => {
        dispatch(getcart())

    }, [succmsg, allcdel])
    const posts = useSelector((state) => state.cart.allcart)

    const gettotal = () => {
        return posts.reduce((price, item) => (item.price * item.qyt) + price, 0)
    }
    console.log("tt", posts)
    const token = localStorage.getItem("normaltoken")

    const [userdata, setuserdata] = useState({
        name: "", email: "", address: "", pincode: "", mobile: ""
    })
    const disprice = gettotal() * discount / 100
    const paydata = {
        total: gettotal() - disprice,
        user: userdata,
        totalcart: posts

    }
    const history = useNavigate()

    useEffect(() => {
        if (succmsg) {

            history('/')
        }
    }, succmsg)

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    async function displayRazorpay(e) {
        e.preventDefault()
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }


        const result = await axios.post("https://foodooze.herokuapp.com/normal/orders", paydata);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_fvOAKuvkkgRaoU", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Foodooze",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    totaldata: paydata

                };

                const result = await axios.post("https://foodooze.herokuapp.com/normal/success", data, { headers: { "x-auth-token": token } });
                setsuccmsg(result.data.msg)
                dispatch(deleted())
                alert(`${result.data.msg ? "Order placed Sucessfully" : null}`);
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="razopay">
            <div className="container">
                
                <div className="row">

                    <div className="col-md-8  col-10 offset-1 offset-md-0  address my-2">
                    <h2>Delivery Address</h2>
                        <form onSubmit={displayRazorpay} >
                            <div className='row'>
                                <div className='col-md-6 col-12'>
                                    <label>Name</label>
                                    <input type="text" placeholder="Name" value={userdata.name} onChange={(e) => setuserdata({ ...userdata, name: e.target.value })} required />

                                </div>
                                <div className='col-md-6 col-12'>
                                    <label>Email</label>
                                    <input type="email" placeholder="Email" value={userdata.email} onChange={(e) => setuserdata({ ...userdata, email: e.target.value })} required />
                                   

                                </div>
                                <div className='col-md-6 col-12'>
                                    <label>Pincode</label>
                                    <input type="tel" placeholder="Pincode" pattern="[0-9]{6}" value={userdata.pincode} onChange={(e) => setuserdata({ ...userdata, pincode: e.target.value })} required />
                                </div>
                                <div className='col-md-6 col-12'>
                                    <label>Mobile</label>
                                    <input type="number" placeholder="Mobile Number" pattern="[0-9]{10}" value={userdata.mobile} onChange={(e) => setuserdata({ ...userdata, mobile: e.target.value })} required />
                                </div>
                                <div className='col-12'>
                                    <label>Address</label>
                                <textarea  placeholder="Address" value={userdata.address} onChange={(e) => setuserdata({ ...userdata, address: e.target.value })} required />

                                </div>

                            </div>



                          
                           
                           
                            

                        </form>







                    </div>
                    <div className="col-md-4 col-12 cart-right my-2">
                        <div className="card shadow">
                            <form onSubmit={async (e) => {
                                e.preventDefault()
                                try {
                                    const product = await axios.get(`http://localhost:1988/pdt/coupons/${cinput}`)
                                    setdiscount(product?.data?.discount)
                                } catch (error) {
                                    alert('invalid')

                                }

                            }}>
                                {/* <div className='ccode'>
                                <input type='text' placeholder='coupoun code' onChange={(e)=>csetinput(e.target.value)} />
                                <button type='submit'>Apply</button>
                            </div> */}
                            </form>
                            <div className="price_detail">
                                <h2>PRICE DETAILS</h2>
                            </div>
                            <div className="total_price">
                                <div className="d-flex justify-content-between">
                                    <p>Price({posts.length} item)</p>
                                    <p>₹{gettotal()?.toFixed(2)}</p>
                                </div>
                                {
                                    discount > 0 ?
                                        <div className="d-flex justify-content-between">
                                            <p>Discount ({discount}%)</p>
                                            <p>- ₹{disprice}</p>
                                        </div> : null
                                }
                                <div className="d-flex justify-content-between">
                                        <p>CGST : </p>
                                        <p>₹{(gettotal() * 0.025).toFixed(2)}  </p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>SGST : </p>
                                        <p>₹{(gettotal() * 0.025).toFixed(2)}  </p>
                                    </div>




                                <h3>Total : ₹{gettotal() + (gettotal() * 0.05)}</h3>
                            </div>
                            <div className="buy_btnx">
                                {/* <button className="shadow" onClick={displayRazorpay}>Pay Now</button> */}
                                <button className="shadow" type="submit" onClick={displayRazorpay}>
                                Pay 
                            </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Razopay
