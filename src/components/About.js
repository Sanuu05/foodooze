import React, { useEffect } from 'react'
import img2 from './img/img2.jpg'
import img from './img/img3.jpg'
import img1 from './img/food1.jpg'
import img3 from './img/food7.jpg'
import { useDispatch, useSelector } from 'react-redux'
// const list = [1, 2, 3]
import { getProduct } from '../action/product'
const list = [
    {
        name: "Mushrrom Curry",
        price: 400,
        img: img
    },
    {
        name: "Pizza",
        price: 550,
        img: img1
    },
    {
        name: "Bread Egg",
        price: 200,
        img: img3
    }
]

function About() {
    const dispatch = useDispatch()
useEffect(() => {
    dispatch(getProduct())
}, [])
const product = useSelector(state => state.product)
const math = Math.floor(Math.random() * 10);
    return (
        <div className='about' id='about'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 col-12 aboutleft'>
                        <div className='homerightonea'>
                            <img src={img2} className='img-fluid' />
                            <div className='circle'>

                            </div>
                            <div className='circle2'>

                            </div>
                            <div className='circle3'>

                            </div>
                            <div className='circle4'>

                            </div>
                            <div className='circle5'>

                            </div>
                        </div>

                    </div>
                    <div className='col-md-6 col-12 aboutright'>
                        <p>About</p>
                        <h3>Welcome to Foodooze</h3>
                        <h5>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</h5>
                        <h4 className=' d-none d-md-flex'>Special Recipe</h4>
                        <div className='row px-5 d-none d-md-flex'>
                            {
                                product?.slice(math,math+3)?.map((v, i) => {
                                    return <div className='col-md-4 col-12 my-3 '>
                                        <div className='cardx'>
                                            <img src={v.productimg} style={{height:'100px',width:'100%'}} className='img-fluid' />
                                            <div className='below'>
                                                <h3>{v.name}</h3>
                                                <h4>₹{v.price}</h4>
                                            </div>
                                            <h6>
                                                {v.des}</h6>

                                        </div>

                                    </div>
                                })
                            }

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default About
