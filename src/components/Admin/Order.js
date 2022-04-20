import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delorder, getorder, orderedit } from '../../action/user'

// import { AiFillDelete } from "react-icons/ai";

import { BiShowAlt } from "react-icons/bi";
// import AdminNavbar from './AdminNavbar'
// import { Line } from 'react-chartjs-2'
import Pusher from 'pusher-js'
function Order() {
    const order = useSelector((state) => state.acart.order)
    const deorder = useSelector((state) => state.acart.delorder)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    console.log('order', order)
    const [resdata, setresdata] = useState()
    useEffect(() => {
        dispatch(getorder())

    }, [resdata])
    useEffect(() => {
        const pusher = new Pusher('acaefd0f6ede12677278', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('order');
        channel.bind('inserted', function (data) {
            setresdata(JSON.stringify(data));
            // alert(JSON.stringify(data))


        });
        const channels = pusher.subscribe('orders');
        channels.bind('deleted', function (data) {
            setresdata(JSON.stringify(data));



        });
        const channel1 = pusher.subscribe('orderd');
        channel1.bind('updated', function (data) {
            setresdata(JSON.stringify(data));


        });

    }, [])
    const orederprice = order?.slice(order?.length - 10, order?.length).map((v) => v.totolPrice)
    const oredername = order?.slice(order?.length - 10, order?.length).map((v) => v.customerDetail.name)
    console.log(oredername)
    console.log("pri", orederprice)
    const totalincome = order?.reduce((prev, curr) => curr.totolPrice + prev, 0)
    const last10 = orederprice?.reduce((prev, curr) => curr + prev, 0)
    const data = {
        labels: oredername,
        datasets: [
            {
                label: 'Purchase Price',
                data: orederprice,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    const [checked, setChecked] = React.useState(false);
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);
        // alert(!checked)
        dispatch(orderedit({ confirmOrder: !checked }))
    };
    const handleChange1 = () => {
        setChecked1(!checked1);
        dispatch(orderedit({ processing: !checked1 }))
    };
    const handleChange2 = () => {
        setChecked2(!checked2);
        dispatch(orderedit({ dispatch: !checked2 }))
    };
    const handleChange3 = () => {
        setChecked3(!checked3);
        dispatch(orderedit({ delivered: !checked3 }))
    };
    return (
        <div className="admin">
            <nav class="navbar shadow navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <a class="logo" href="/admin">Foodooze</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul class="navbar-nav ">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/top">Top Product</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/query">Customer Query</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/adminorder">Orders</a>
                            </li>



                        </ul>

                    </div>
                </div>
            </nav>

            <div className="order addproduct">


                <div className="container mt-2">
<h2>Orders</h2>
                    <div className="row ">
                        {
                            order?.map((v, i) => {
                                return <div className='col-md-4 col-xl-3 col-12'>
                                    <div className='cardo'>
                                        <h2>{v?.customerDetail?.name}</h2>
                                        <div className='upcorder'>
                                            <p>Name : {v?.customerDetail?.name}</p>
                                            <p>Email : {v?.customerDetail?.email}</p>
                                            <p>Mobile : {v?.customerDetail?.mobile}</p>
                                            <p>Address : {v?.customerDetail?.address} , {v?.customerDetail?.pincode}</p>
                                            <p>Ordered on : {v?.ordertime} </p>
                                            <p>Delivered on : {v?.deliverytime}</p>
                                        </div>
                                        <div className='topcorder'>
                                            {
                                                v?.customerOrder?.map((v, i) => {
                                                    return <div className='omapc'>
                                                        {/* <img src={v?.pimg} className='img-fluid' /> */}
                                                        <span>{i + 1}) {v?.pname} * {v?.qyt}</span>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className='midcorder'>
                                            <div class="form-group">
                                                <p className='m-0'>Confirm Order</p>
                                                <input type="checkbox" id="ConfirmedOrder" checked={v?.confirmOrder}
                                                    onChange={() => {
                                                        dispatch(orderedit({ confirmOrder: !v?.confirmOrder }, v?._id))
                                                    }} />
                                                <label for="ConfirmedOrder" ></label>
                                            </div>
                                            <div class="form-group">
                                                <p className='m-0'>Processing Order</p>
                                                <input type="checkbox" id="ProcessingOrder" checked={v?.processing}
                                                    onChange={() => {
                                                        dispatch(orderedit({ processing: !v?.processing }, v?._id))
                                                    }} />
                                                <label for="ProcessingOrder"></label>
                                            </div>
                                            <div class="form-group">
                                                <p className='m-0'>Order Dispatch</p>
                                                <input type="checkbox" id="ProductDispatched" checked={v?.dispatch}
                                                    onChange={() => {
                                                        dispatch(orderedit({ dispatch: !v?.dispatch }, v?._id))
                                                    }} />
                                                <label for="ProductDispatched"></label>
                                            </div>
                                            <div class="form-group">
                                                <p className='m-0'>Order Delivered</p>
                                                <input type="checkbox" id="ProductDelivered" checked={v?.delivered}
                                                    onChange={() => {
                                                        dispatch(orderedit({ delivered: !v?.delivered }, v?._id))
                                                    }} />
                                                <label for="ProductDelivered"></label>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            })
                        }
                        {/* <div className="col-md-12 col-12 orr">
                           
                            <div className="row addpdttop">

                                <div className="col-md-3 p-2">
                                    <div className="addpdtcard">
                                        <h4>Total Orders</h4>
                                        <h5>{order?.length}</h5>
                                    </div>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div className="addpdtcard">
                                        <h4>Total Income</h4>
                                        <h5>₹{totalincome}</h5>
                                    </div>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div className="addpdtcard">
                                        <h4>Last 10 order income</h4>
                                        <h5>{last10}</h5>
                                    </div>
                                </div>
                                <div className="col-md-3 p-2">
                                    <div className="addpdtcard">
                                        <h4>Out Of Stock</h4>
                                    </div>
                                </div>

                            </div>
                            <table >
                                <tbody>
                                    <tr>
                                        <th>Customer_Name</th>
                                        <th>Customer_Email</th>
                                        <th>Customer_Address</th>
                                        <th>Customer_Product</th>
                                        <th>Amount</th>
                                        <th>Confirm Order</th>
                                        <th>Processing</th>
                                        <th>Dispatch</th>
                                        <th>Delivered</th>
                                        <th>Delete</th>
                                    </tr>
                                    {order ?
                                        order.map((v, index) => {
                                            return (
                                                <>
                                                    <tr key={index} className="v    px-2 my-5">
                                                        <td className="px-1 "><BiShowAlt className="vieweye" data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`} /> {v.customerDetail.name}</td>
                                                        <td className="px-1">{v.customerDetail.email}</td>
                                                        <td className="px-1">{v.customerDetail.address}</td>
                                                        <td className="px-1">{v.customerOrder.map((v) => {
                                                            return <span>{v.pname},</span>
                                                        })}</td>
                                                        <td className="px-1">₹{v.totolPrice}</td>
                                                        <td className='px-1'>
                                                            <div class="form-group">
                                                                <input type="checkbox" id="ConfirmedOrder" checked={v?.confirmOrder}
                                                                    onChange={() => {
                                                                        dispatch(orderedit({ confirmOrder: !v?.confirmOrder }, v?._id))
                                                                    }} />
                                                                <label for="ConfirmedOrder" ></label>
                                                            </div>
                                                        </td>
                                                        <td className='px-1'>
                                                            <div class="form-group">
                                                                <input type="checkbox" id="ProcessingOrder" checked={v?.processing}
                                                                    onChange={() => {
                                                                        dispatch(orderedit({ processing: !v?.processing }, v?._id))
                                                                    }} />
                                                                <label for="ProcessingOrder"></label>
                                                            </div>
                                                        </td>
                                                        <td className='px-1'>
                                                            <div class="form-group">
                                                                <input type="checkbox" id="ProductDispatched" checked={v?.dispatch}
                                                                    onChange={() => {
                                                                        dispatch(orderedit({ dispatch: !v?.dispatch }, v?._id))
                                                                    }} />
                                                                <label for="ProductDispatched"></label>
                                                            </div>
                                                        </td>
                                                        <td className='px-1'>
                                                            <div class="form-group">
                                                                <input type="checkbox" id="ProductDelivered" checked={v?.delivered}
                                                                    onChange={() => {
                                                                        dispatch(orderedit({ delivered: !v?.delivered }, v?._id))
                                                                    }} />
                                                                <label for="ProductDelivered"></label>
                                                            </div>

                                                        </td>

                                                        <td className="px-1"><a className="fa fa-trash" aria-hidden="true" onClick={() => dispatch(delorder(v._id))} /></td>
                                                    </tr>
                                                    <div class="modal fade" id={`exampleModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title" id="exampleModalLabel">Order Details</h5>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <div className="order_user">
                                                                        <h2>Name:<span>{v.customerDetail.name}</span></h2>
                                                                        <h2>Email:<span>{v.customerDetail.email}</span></h2>
                                                                        <h2>Mobile:<span>{v.customerDetail.mobile}</span></h2>
                                                                        <h2>Address:<span>{v.customerDetail.address},{v.customerDetail.pincode}</span></h2>


                                                                    </div>
                                                                    <div className="order_product row">
                                                                        {
                                                                            v.customerOrder.map((v, inde) => {
                                                                                return <>
                                                                                    <div className="col-4 mt-2">
                                                                                        <img src={v.pimg} className="img-fluid" />
                                                                                    </div>
                                                                                    <div className="col-8 mt-2">
                                                                                        <p className="o1"><span>{v.pname}</span></p>
                                                                                        <p className="o2"><span>₹ {v.price}</span></p>
                                                                                        <p className="o3">Qyt:<span>{v.qyt}</span></p>
                                                                                    </div>
                                                                                </>
                                                                            })
                                                                        }

                                                                    </div>
                                                                    <div className="text-center mt-3 tm">
                                                                        <h1 className="t1 shadow">Total:<span>₹{v.totolPrice}</span></h1>

                                                                    </div>
                                                                    <div class="new">
                                                                        <form>



                                                                            
                                                                        </form>
                                                                    </div>

                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }) : <h1>loading....</h1>
                                    }
                                </tbody>
                            </table>
                        </div> */}
                    </div>

                </div>
            </div>
        </div >

    )
}

export default Order
