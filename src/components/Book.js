import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postQuery } from '../action/product'
import img from './img/img4.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Book() {
    const [book, setbook] = useState({
        name: "", guest: "", date: "", mobile: "", messages: "", time: ""
    })
    const dispatch = useDispatch()
    return (
        <div className='book' id='book'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-7 col-10 offset-md-0 offset-1'>
                        <img src={img} className='img-fluid' />
                    </div>
                    <div className='col-md-5 col-10 offset-md-0 offset-1 bookright'>
                        <div className='row'>
                            <form onSubmit={(e)=>{
                                e.preventDefault()
                                dispatch(postQuery(book))
                                setbook({name: "", guest: "", date: "", mobile: "", messages: "", time: ""})
                                toast.success('Table Reservation request send succesfully , confirmation message will be send to your mobile number')
                            }}>
                                <div className='col-md-10 offset-md-2 col-12 offset-0'>
                                    <h2>Book a table</h2>
                                    <p>Making a reservation at Délicious restaurant is easy and takes just a couple of minutes.</p>
                                    <input type='text' value={book.name} placeholder='Name' onChange={(e) => setbook({...book,name:e.target.value})} />
                                    <input type='number' value={book.guest} placeholder='Number of Guest' onChange={(e) => setbook({...book,guest:e.target.value})}/>
                                    <input type='date' value={book.date} placeholder='Date' className='w-50 px-1' onChange={(e) => setbook({...book,date:e.target.value})} />
                                    <select id="cars" value={book.time} className='w-50 px-1' onChange={(e) => setbook({...book,time:e.target.value})} >
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                        {/* <option value="audi">Audi</option> */}
                                    </select>
                                    <input type='number' value={book.mobile} placeholder='Phone Number' onChange={(e) => setbook({...book,mobile:e.target.value})} />
                                    <textarea rows={5} value={book.messages} placeholder='Message' onChange={(e) => setbook({...book,messages:e.target.value})} />
                                    <button className='w-100' type='submit'>Send Request</button>


                                </div>
                            </form>
                        </div>


                    </div>

                </div>
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

export default Book
