import React from 'react'
import { MdRestaurantMenu, MdAdsClick,MdOutlineFastfood } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { SiCodechef } from "react-icons/si";

function Service() {
    return (
        <div className='service' id='service'>
            <div className='container'>
                <div className='row px-5'>
                <div className='title'>
                        <h2>Our Best Services</h2>
                    </div>
                    <div className='titlebelow'>
                        <p>Consectetur numquam poro nemo veniam <br />
                            eligendi rem adipisci quo modi.</p>
                       

                    </div>
                    <div className='col-md-4 col-12 mt-3 '>
                        <div className='cards px-3'>
                        <SiCodechef/>
                        <h3>Best Chef</h3>
                        <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>

                        </div>
                      
                        
                    </div>
                    <div className='col-md-4 col-12 mt-3 '>
                    <div className='cards px-3 cardsx'>
                    <MdOutlineFastfood/>
                        <h3>Quality Food</h3>
                        <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                            
                            </div>
                       
                        
                    </div>
                    <div className='col-md-4 col-12 mt-3 '>
                    <div className='cards px-3'>
                    <SiCodechef/>
                        <h3>Perfect Cook</h3>
                        <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                            
                            </div>
                    
                        
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Service
