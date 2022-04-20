import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

function TopList() {
    const dispatch= useDispatch()
    const top = useSelector(state=>state.top)
    // const deltop = useSelector(state=>state.refresh.del)
    // console.log("toop",top)
    return (
        <div>
            <div className="row toplist">
                {
                    top.map((val,index)=>{
                        return <div className="col col-6 ">
                        <div className="card mt-2">
                            <div className="card-title text-capitalize text-center">
                               <h4>{val.top.name}</h4>
                            </div>
                            <div className="card-body">
                                <img src={val.top.productimg} className="img-fluid topimg"/>
                            </div>
                            <div className="card-footer">
                                <h6>₹ {val.top.price}</h6>
   
                            </div>
                        </div>
                   </div>
                    })
                }
                
            </div>
        </div>
    )
}

export default TopList
