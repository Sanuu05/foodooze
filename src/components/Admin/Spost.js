import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { delProduct, editProduct, getoneProduct } from '../../action/product'
import { Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
function Spost({ val, index }) {
    const dispatch = useDispatch()
    console.log('vv',val)

    const [editname, seteditname] = useState()
    const [editprice, seteditprice] = useState()
    const [editpic, seteditpic] = useState()
    const [editstock, seteditstock] = useState()
    const [editdes, seteditdes] = useState()
    const [editnveg, seteditnveg] = useState()
    const [editcath, seteditcath] = useState()
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editone = () => {
        setShow(true)
        seteditname(val.name)
        seteditprice(val.price)
        seteditstock(val?.stock)
        seteditdes(val?.des)
        seteditcath(val?.cath)
        seteditnveg(val?.nveg)
    }
    const change = () => {

        if (editpic && editname && editname) {
            {
                const data = new FormData()
                data.append("file", editpic)
                data.append("upload_preset", "insta-clone")
                data.append("cloud_name", "sannu")
                fetch("https://api.cloudinary.com/v1_1/sannu/image/upload", {
                    method: "post",
                    body: data
                }).then(res =>
                    res.json())
                    .then(data => {
                        dispatch(editProduct(val._id, { name: editname, price: editprice, productimg: data.url, stock: editstock, des: editdes, cath: editcath,nveg:editnveg }))
                        setShow(false)


                    }).catch(err => console.log(err))
            }
        } else {
            dispatch(editProduct(val._id, { name: editname, price: editprice, stock: editstock, des: editdes, cath: editcath,nveg:editnveg }))
            setShow(false)
        }
    }

    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td>{val?.name}</td>
                <td>{val?.cath}</td>
                <td>{val?.stock}</td>
                <td>₹{val.price}</td>
                <td><img src={val.productimg} className="pdtimgg" /></td>
                <td><i class="fas fa-edit" onClick={editone} ></i>/<i class="fas fa-trash-alt" onClick={() => dispatch(delProduct(val._id))}></i></td>
                <td>{val?.popular?<AiOutlineClose onClick={()=>dispatch(editProduct(val._id, { popular:false }))} />:<AiOutlineCheck onClick={()=>dispatch(editProduct(val._id, { popular:true }))}/>} </td>
                <td>{val?.special?<AiOutlineClose onClick={()=>dispatch(editProduct(val._id, { special:false }))}/>:<AiOutlineCheck onClick={()=>dispatch(editProduct(val._id, {special:true }))}/>} </td>
                <td>{val?.chef?<AiOutlineClose onClick={()=>dispatch(editProduct(val._id, { chef:false }))}/>:<AiOutlineCheck onClick={()=>dispatch(editProduct(val._id, { chef:true }))}/>} </td>

            </tr>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Name</label>
                    <input type="text" placeholder="name" value={editname} onChange={(e) => seteditname(e.target.value)} />
                    <label>Description</label>
                    <input type="text" placeholder="description" value={editdes} onChange={(e) => seteditdes(e.target.value)} />
                    <label>Category</label>
                    <select id="cars" value={editcath} onChange={(e) => seteditcath(e.target.value)}>
                        <option value="">Choose Food category</option>
                        <option value="starters">Starters</option>
                        <option value="main course">Main Course</option>
                        <option value="dessert">Dessert</option>
                        <option value="beverages">Beverages</option>
                    </select>
                    <label>Veg/ Non-veg </label>
                    <select id="cars" value={editnveg} onChange={(e) => seteditnveg(e.target.value)}>
                        <option value="true">Non-Veg</option>
                        <option value="false">Veg</option>
                        
                    </select>
                    <label>price</label>
                    <input type="number" placeholder="Price" value={editprice} onChange={(e) => seteditprice(e.target.value)} />
                    <label>stock</label>
                    <input type="number" placeholder="Stock" value={editstock} onChange={(e) => seteditstock(e.target.value)} />
                    <div className='modimg'>
                        <img src={val.productimg} alt="ss" className="img-fluid" />

                    </div>

                    <input type="file" onChange={(e) => seteditpic(e.target.files[0])} />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                    <button type="button" class="btn btn-primary" onClick={change} data-bs-dismiss="modal">Save changes</button>
                </Modal.Footer>
            </Modal>
            {/* <div class="modal fade" id={`exampleModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" placeholder="name" value={editname} onChange={(e) => seteditname(e.target.value)} />
                            <input type="number" placeholder="Price" value={editprice} onChange={(e) => seteditprice(e.target.value)} />
                            <input type="number" placeholder="Stock" value={editstock} onChange={(e) => seteditstock(e.target.value)} />
                            <img src={val.productimg} alt="ss" className="img-fluid" />
                            <input type="file" onChange={(e) => seteditpic(e.target.files[0])} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={change} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Spost
