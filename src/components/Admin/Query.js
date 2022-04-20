import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { delQuery, getQuery } from '../../action/product'
import Pusher from 'pusher-js'


function Query() {
    const [resdata, setresdata]= useState()
    const [del,setdel] = useState()
    useEffect(() => {
        const pusher = new Pusher('dd6db006f4dad11b7fe7', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('query');
        channel.bind('qinserted', function (data) {
            setresdata(JSON.stringify(data));
        });
        const channels = pusher.subscribe('delproduct');
        channels.bind('qdeleted', function (data) {
            setdel(JSON.stringify(data));
        });
        // const channel1 = pusher.subscribe('prod');
        // channel1.bind('updated', function (data) {
        //     setitem(JSON.stringify(data));
        // });
        
    },[])
    console.log(resdata)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getQuery())
    },[resdata,dispatch,del])
   
    const query = useSelector(state=>state.query)
    console.log(query)
    return (
        <div className="query">
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
                    <div className="">
                        <div className="col-md-10 col-12 card">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Quest</th>
                                    <th>Mobile</th>
                                    <th>Message</th>
                                </tr>
                                {
                                    query.map((val,index)=>{
                                        return <tr>
                                            <td>{index+1}|| <i class="fas fa-trash-alt" onClick={()=>dispatch(delQuery(val._id))}/></td>
                                            <td>{val.name}</td>
                                            <td>{val.date}</td>
                                            <td>{val.time}</td>
                                            <td>{val.guest}</td>
                                            <td>{val.mobile}</td>
                                            <td>{val.messages}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    </div>
        </div>
    )
}

export default Query
