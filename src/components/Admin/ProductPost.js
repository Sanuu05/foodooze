import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { delProduct, editProduct, getoneProduct } from '../../action/product'
import Spost from './Spost'
import Pusher from 'pusher-js'

function ProductPost() {
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const [resdata, setresdata] = useState()
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
            setresdata(JSON.stringify(data));
        });
        // const channel1 = pusher.subscribe('prod');
        // channel1.bind('updated', function (data) {
        //     setitem(JSON.stringify(data));
        // });
        
    },[])
    
    
    
    return (
        <div className="card mt-5">
            <table>
                <tbody className="text-center">
                    <tr>
                        <th>Sl.no</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Edit/ Delete</th>
                        <th>Popular</th>
                        <th>Special</th>
                        <th>Chef</th>
                    </tr>
                    {
                        product.map((val, index) => {
                            return <Spost val={val} index={index}/>
                        })
                    }

                </tbody>
            </table>

             
        </div>
    )
}

export default ProductPost
