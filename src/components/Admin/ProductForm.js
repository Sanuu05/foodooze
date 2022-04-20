import React, { useState } from 'react'
import { postProduct } from '../../action/product'
import { useDispatch } from 'react-redux'

function ProductForm() {
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [des, setdes] = useState("")
    const [pic, setpic] = useState("")
    const [stock, setstock] = useState()
    const [cath, setcath] = useState('')
    const [nveg,setnveg] = useState(true)
    const dispatch = useDispatch()
    const submit = () => {
        if (pic && price && name && des) {
            const data = new FormData()
            data.append("file", pic)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "sannu")
            fetch("https://api.cloudinary.com/v1_1/sannu/image/upload", {
                method: "post",
                body: data
            }).then(res =>
                res.json())
                .then(data => {
                    dispatch(postProduct({ name: name, price: price, productimg: data.url, stock: stock, des: des,cath:cath,nveg:nveg }))

                    setname("")
                    setprice("")
                    setpic("")
                    setstock('')
                    setcath('')
                }).catch(err => console.log(err))
        }
    }
    return (
        <div className="card mt-5 shadow">
            <div className="card-header">
                <h4>Product Detail</h4>
            </div>
            <div className="card-body">
                <input type="text" value={name} placeholder="Dish Name" onChange={(e) => setname(e.target.value)} />
                <input type="text" value={des} placeholder="Description" onChange={(e) => setdes(e.target.value)} />
                <input type="Number" value={price} placeholder="Price" onChange={(e) => setprice(e.target.value)} />
                <input type="Number" value={stock} placeholder="Stock" onChange={(e) => setstock(e.target.value)} />
                <select id="cars" value={cath} onChange={(e)=>setcath(e.target.value)}>
                    <option value="">Choose Food category</option>
                    <option value="starters">Starters</option>
                    <option value="main course">Main Course</option>
                    <option value="dessert">Dessert</option>
                    <option value="beverages">Beverages</option>
                    {/* APPETIZERS */}
                </select>
                <select className='mt-3' value={nveg} onChange={(e)=>setnveg(e.target.value)}>
                    {/* <option value="">Choose Food category</option> */}
                    <option value="true">Non-Veg</option>
                    <option value="false">Veg</option>
                   
                    {/* APPETIZERS */}
                </select>
                <input type="file"  onChange={(e) => setpic(e.target.files[0])} />
                <button className=" btn btn-primary mt-2" onClick={submit} >Submit</button>
            </div>
        </div>
    )
}

export default ProductForm
