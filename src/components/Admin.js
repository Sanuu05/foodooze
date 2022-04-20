import React, { useEffect, useState } from 'react'
import ProductForm from './Admin/ProductForm'
import ProductPost from './Admin/ProductPost'
import { useDispatch } from 'react-redux'
import { getProduct } from '../action/product'
import Pusher from 'pusher-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Admin() {
    const dispatch = useDispatch()
    const [resdata, setresdata] = useState()
    const [del, setdel] = useState()
    const [edit, setitem] = useState()

    useEffect(() => {
        const pusher = new Pusher('acaefd0f6ede12677278', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('product');
        channel.bind('inserted', function (data) {
            setresdata(JSON.stringify(data));
            toast.success('Product Added Sucesfully')
        });
        const channels = pusher.subscribe('products');
        channels.bind('deleted', function (data) {
            setdel(JSON.stringify(data));
            toast.success('Product Deleted Sucesfully')
        });
        const channel1 = pusher.subscribe('prod');
        channel1.bind('updated', function (data) {
            setitem(JSON.stringify(data));
            toast.success('Product Updated Sucesfully')
        });

    })

    useEffect(() => {
        dispatch(getProduct())
    }, [resdata, del, edit, dispatch])
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

            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-12 order-md-0 order-1">
                        <ProductPost />
                    </div>
                    <div className="col-md-4 col-12 order-md-1 order-0">
                        <ProductForm />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Admin
