import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { trackorder } from '../action/user'
import Pusher from 'pusher-js'
import { MdFastfood,MdListAlt,MdOutlineDirectionsBike,MdHomeWork} from "react-icons/md";
import { GiConfirmed,GiChefToque } from "react-icons/gi";
function Track() {
    const dispatch = useDispatch()
    const {id} = useParams()
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         dispatch(trackorder(id))
    //     }, 1000);
    //     return () => clearInterval(interval);
    //   }, []);
    // useEffect(() => {
          

    // }, [])
    const[resdata,setresdata] = useState()
    useEffect(() => {
      dispatch(trackorder(id))
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
      
  },[])
    const orderlist = useSelector((state) => state.track)
    console.log("List",orderlist)
    return (
        <div>
            <div className="main_container">

                



                <div class="container padding-bottom-3x mb-1">
                    <div class="card mb-3">
                        {/* <div class="p-4 text-center text-white text-lg bg-dark rounded-top"><span class="text-uppercase">Tracking Order No - </span><span class="text-medium">001698653lp</span></div> */}
                        <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                            {/* <div class="w-100 text-center py-1 px-2"></div> */}
                            <div class="w-100 text-center py-1 px-2"><span class="text-medium">Ordered on:</span> {orderlist?.ordertime}</div>
                            <div class="w-100 text-center py-1 px-2"><span class="text-medium">Delivered on:</span> {orderlist?.deliverytime}</div>
                            {/* <p>Ordered on : {orderlist?.ordertime} </p>
                    <p>Delivered on : {orderlist?.deliverytime}</p> */}
                        </div>
                        <div class="card-body">
                            <div class="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                            <div class={orderlist?.orderPlaced?"step completed":"step"} >
                                    <div class="step-icon-wrap">
                                        <div class="step-icon"><MdListAlt/></div>
                                    </div>
                                    <h4 class="step-title">Order Placed</h4>
                                    <p class="step-para">We have received your order.</p>
                                </div>
                                <div class={orderlist?.confirmOrder?"step completed":"step"} >
                                    <div class="step-icon-wrap">
                                        <div class="step-icon"><GiConfirmed/></div>
                                    </div>
                                     <h4 class="step-title">Confirmed Order</h4>
                                     <p class="step-para">Your order has been confirmed.</p>
                                </div>
                                <div class={orderlist?.processing?"step completed":"step"}>
                                    <div class="step-icon-wrap">
                                        <div class="step-icon"><GiChefToque/></div>
                                    </div>
                                    <h4 class="step-title">Order Processed</h4>
                                    <p class="step-para">Your food is getting cooked.</p>
                                </div>
                                {/* <div class="step completed">
                                    <div class="step-icon-wrap">
                                        <div class="step-icon"><i class="pe-7s-medal"></i></div>
                                    </div>
                                    <h4 class="step-title">Quality Check</h4>
                                </div> */}
                                <div class={orderlist?.dispatch?"step completed":"step"}>
                                    <div class="step-icon-wrap">
                                        <div class="step-icon"><MdOutlineDirectionsBike/></div>
                                    </div>
                                    <h4 class="step-title">Order Dispatched</h4>
                                    <p class="step-para">Your food is on the way.</p>
                                </div>
                                <div class={orderlist?.delivered?"step completed":"step"}>
                                    <div class="step-icon-wrap">
                                        <div class="step-icon"><MdHomeWork/></div>
                                    </div>
                                    <h4 class="step-title">Order Delivered</h4>
                                    <p class="step-para">Enjoy your Food.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                        {/* <div class="custom-control custom-checkbox mr-3">
                            <input class="custom-control-input" type="checkbox" id="notify_me" checked="" />
                            <label class="custom-control-label" for="notify_me">Notify me when order is delivered</label>
                        </div> */}
                        {/* <div class="text-left text-sm-right"><a class="btn btn-outline-primary btn-rounded btn-sm" href="#">View Order Details</a></div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Track
