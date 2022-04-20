import React, { useEffect, useState } from 'react'
import { getProduct, getTop, postTop } from '../../action/product'
import TopPdt from './TopPdt'
import { useDispatch, useSelector } from 'react-redux'
import refresh from '../../reducers/refresh'
import TopList from './TopList'
import Pusher from 'pusher-js'
function TopProduct() {
    const dispatch = useDispatch()
    const deltop = useSelector(state => state.refresh.del)
    const posttop = useSelector(state => state.refresh.post)
    console.log("dd", deltop)
    console.log("pp", postTop)
    const[resdata,setresdata] = useState()
    useEffect(() => {
        dispatch(getProduct())
    }, [resdata])
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
        <div>
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
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-12 top_left">
                        <TopPdt />
                    </div>
                    <div className="col-md-4 col-12 mt-5 top_right text-center pt-2">
                        <h5>Top Product List</h5>
                        <TopList />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TopProduct
