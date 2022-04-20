import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { delProduct, editProduct, getoneProduct, getProduct, getTop } from '../../action/product'
import Spost from './Top1'

function TopPdt() {
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const deltop = useSelector(state=>state.refresh.del)
    const posttop = useSelector(state=>state.refresh.post)
    useEffect(() => {
        dispatch(getProduct())
    }, [deltop,posttop,dispatch])
    useEffect(()=>{
        dispatch(getTop())
    },[])
    
    
    
    return (
        <div className="card mt-5">
            <table>
                <tbody className="text-center">
                    <tr>
                        <th>Sl.no</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Top List</th>
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

export default TopPdt
