import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getorderlist } from '../action/user'
import Track from './Track'

function Orderpage() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getorderlist())

    }, [])
    const orderlist = useSelector((state) => state.orderlist)
    console.log("ooo", orderlist)
    return (
        <div className="orderitem">
            <div className="container">
                <h2 className="text-center">Orders</h2>
                <div className="row">
                    {
                        orderlist.reverse().map((val, index) => {
                            return <div className="col-md-10 offset-md-1 offset-0 offset-12 mainorder">
                                <div className="row ">
                                    <div className='col-12 mainordertop'>
                                        <div>
                                            <p>Ordered on {val?.data?.ordertime}</p>

                                        </div>
                                        <div>
                                            <p>Total : ₹ {(val?.data?.total + (val?.data?.total*0.05))?.toFixed(2)}</p>

                                        </div>
                                    </div>
                                    <div className='col-md-6 mainlefto'>
                                        {
                                            val?.data?.list?.map((d, ii) => {
                                                return <>
                                                    <span>{d?.pname} * {d?.qyt} ,</span>
                                                </>
                                            })
                                        }

                                    </div>
                                    <div className='col-md-6 mainrighto'>
                                    <a href={`/orderdetail/${val.data?.trackid}`}>
                                        <button>
                                            Details
                                        </button>
                                        </a>
                                        <a href={`/track/${val.data?.trackid}`}>
                                        <button>
                                            Track Order
                                        </button>
                                        </a>
                                    </div>
                                    {/* <div className="col-4 col-md-2 mainleft">
                                        <img src={val.data.pimg} className="img-fluid" />
                                    </div>
                                    <div className="col-8 col-md-10 mainright">
                                        <p className="l1">{val.data.pname}</p>
                                        <p className="l2">{val.data.qyt}</p>
                                        <p className="l3">₹ {val.data.qyt*val.data.price}</p>
                                        <a className='btn btn-primary' href={`/track/${val.data?.trackid}`}>Track Order</a>

                                    </div> */}
                                    <div className='col-12'>

                                    </div>
                                </div>


                            </div>


                        })
                    }


                </div>
            </div>


        </div>
    )
}

export default Orderpage
