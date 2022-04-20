import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom'
// import { loadUser, loguser } from '../../action/user'
import {userNormalSign} from '../../action/user'
import {NavLink} from 'react-router-dom'
import img1 from '../img/photo28.svg'

function Signup() {
    const[data, setdata] = useState({
        email:"" , password:"" , name:"",cpassword:"", mobile:""
    })
    const dispatch = useDispatch()
    const submit =()=>{
        dispatch(userNormalSign(data))
    }
    return (
        <div className="signup">
            <div className="container">
                <div className="row signupmain shadow-lg">
                    <div className="col-md-6 col-12 signleft">
                        <img src={img1} className="img-fluid" />

                    </div>
                    <div className="col-md-6 col-12 signright">
                        <h2>Signup</h2>
                    <input type="name" placeholder="Name" name="name" onChange={(e)=>setdata({...data,name:e.target.value})} required/>
                    <input type="email" placeholder="Email" name="email" onChange={(e)=>setdata({...data,email:e.target.value})} required/>
                    <input type="number" placeholder="Mobile Number" name="mobile" onChange={(e)=>setdata({...data,mobile:e.target.value})} required/>
                    <input type="password" placeholder="Password" name="password" onChange={(e)=>setdata({...data,password:e.target.value})} required/>
                    <input type="password" placeholder="ConfirmPassword" name="cpassword" onChange={(e)=>setdata({...data,cpassword:e.target.value})} required/>
                    <button className="shadow" onClick={submit}>Login</button>
                    <NavLink to="/login" className="nlink">
                        <h1>Have a account?</h1>
                    </NavLink>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup
