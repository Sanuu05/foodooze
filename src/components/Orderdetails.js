import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { trackorder } from '../action/user'

function Orderdetails() {
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(trackorder(id))
    }, [])
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         dispatch(trackorder(id))
    //     }, 1000);
    //     return () => clearInterval(interval);
    //   }, []);
    const orderlist = useSelector((state) => state.track)
    console.log("List", orderlist)

    return <div className='orderdetails'>
        <div className='container'>
            <div className='row'>
                <div>
                    <p>Order id: {orderlist?._id}</p>
                </div>
                <div className='col-md-6 odl1 '>
                    <p>Name : {orderlist?.customerDetail?.name}</p>
                    <p>Email : {orderlist?.customerDetail?.email}</p>
                    <p>Mobile : {orderlist?.customerDetail?.mobile}</p>
                    <p>Address : {orderlist?.customerDetail?.address} , {orderlist?.customerDetail?.pincode}</p>
                </div>
                <div className='col-md-6 odr1 '>
                    <p>Ordered on : {orderlist?.ordertime} </p>
                    <p>Delivered on : {orderlist?.deliverytime}</p>

                </div>
                <div className='col-md-6 odl2'>
                    {
                        orderlist?.customerOrder?.map((v, i) => {
                            return <div className='omap'>
                                <img src={v?.pimg} className='img-fluid' />
                                <p>{v?.pname} * {v?.qyt}</p>
                            </div>
                        })
                    }
                </div>
                <div className='col-md-6 odr2'>
                    <div className='ccard'>
                        <div className='ccarddiv'>
                            <p>Item Total :</p>
                            <p>₹ {(orderlist?.totolPrice)?.toFixed(2)}</p>
                        </div>
                        <div className='ccarddiv'>
                            <p>CGST :</p>
                            <p>₹ {(orderlist?.totolPrice * 0.05)?.toFixed(2)}</p>
                        </div>
                        <div className='ccarddiv'>
                            <p>SGST :</p>
                            <p>₹ {(orderlist?.totolPrice * 0.05)?.toFixed(2)}</p>
                        </div>
                        <div className='ccarddiv'>
                            <p>Total :</p>
                            <p>₹ {(orderlist?.totolPrice + (orderlist?.totolPrice * 0.05) + (orderlist?.totolPrice * 0.05))?.toFixed(2)}</p>
                        </div>

                    </div>
                </div>


            </div>
        </div>

    </div>;
}

export default Orderdetails;
