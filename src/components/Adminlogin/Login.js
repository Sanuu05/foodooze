import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom'
// import { loadUser, loguser } from '../../action/user'
import {NavLink, useNavigate} from 'react-router-dom'
import img1 from '../img/photo28.svg'
import {Nloguser} from '../../action/user'
function Login() {
    const dispatch = useDispatch()
    const[data, setdata] = useState({
        email:"" , password:"" 
    })
    const submit =()=>{
        dispatch(Nloguser(data))
    }
   
    const token = useSelector((state)=>state?.normal?.token)
    const history = useNavigate()
    useEffect(()=>{
        if(token){
            // history.push('/')
            history('/')

        }


    },[history,token])
    return (
        <div className="signup">
            <div className="container">
                <div className="row signupmain shadow-lg">
                    <div className="col-md-6 col-12 signleft">
                        <img src={img1} className="img-fluid" />

                    </div>
                    <div className="col-md-6 col-12 signright">
                    <input type="email" placeholder="Email" name="email" onChange={(e)=>setdata({...data,email:e.target.value})} required/>
                    <input type="password" placeholder="Password" name="password" onChange={(e)=>setdata({...data,password:e.target.value})} required/>
                    <button className="shadow" onClick={submit}>Login</button>
                    <NavLink to="/signup" className="nlink">
                        <h1>Don't have a account?</h1>
                    </NavLink>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
