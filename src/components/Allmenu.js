import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../action/product'
import Mainmenu from './Mainmenu'
import Navbar from './Navbar'
import Pusher from 'pusher-js'
function Allmenu() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [resdata, setresdata]= useState()
    const [del, setdel]= useState()
    const [edit, setitem] = useState()
    useEffect(() => {
        const pusher = new Pusher('acaefd0f6ede12677278', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('product');
        channel.bind('inserted', function (data) {
            setresdata(JSON.stringify(data));
           
        });
        const channels = pusher.subscribe('products');
        channels.bind('deleted', function (data) {
            setdel(JSON.stringify(data));
            
        });
        const channel1 = pusher.subscribe('prod');
        channel1.bind('updated', function (data) {
            setitem(JSON.stringify(data));
            
        });
        
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProduct()) 
    }, [resdata,del,edit])
    const product = useSelector(state => state.product)
    const filstarter = product?.filter(p=>p?.cath === "starters") 
    const filmain = product?.filter(p=>p?.cath === "main course") 
    const fildessert = product?.filter(p=>p?.cath === "dessert") 
    const filbeverages = product?.filter(p=>p?.cath === "beverages") 
    console.log('fil',filstarter)
    return (
        <div>
            <Navbar />
            <div className='pt-5'>
                <Mainmenu title="Starters" data={filstarter} />
                <Mainmenu title="Main Course" data={filmain} />
                <Mainmenu title="Dessert" data={fildessert} />
                <Mainmenu title="Beverages" data={filbeverages} />

            </div>
            <div className='footer mt-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <h4 className='logo'>Foodooze</h4>
                        </div>
                        <div className='col-6' style={{ display: 'flex', justifyContent: "right", alignItems: 'center' }}>
                            <p>© 2021 bnb, Inc.
                                Privacy
                                Terms
                                Company details</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Allmenu
