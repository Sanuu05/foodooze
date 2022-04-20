import React from 'react'
import { MdRestaurantMenu ,MdAdsClick} from "react-icons/md";
import img1 from './img/girl3.png'
function Home() {
    return (
        <div className='home'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 col-12 homeleft px-md-5 px-5'>
                        <p style={{fontSize:'18px',fontWeight:'400',color:'#E85A4f'}}>Discover the Taste</p>
                        <h2>Meet, Eat & Enjoy the true test</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className='homebtn mt-3'>
                            <a href='/menu' >
                            <button className='btnone'><MdRestaurantMenu/> Menu</button>
                            </a>
                            <a href='#about'>
                            <button className='btntwo'><MdAdsClick/> About</button>
                            </a>
                          
                           

                        </div>

                    </div>
                    <div className='col-md-6 col-12 homeright'>
                        <div className='homerightone'>
                            <div className='himg'>
                        <img src={img1} className='img-fluid' />
                        </div>
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
                </div>

            </div>
            
        </div>
    )
}

export default Home
