import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchProductById, addProductToCart } from '../Slices/ProductSlice'
import Header from '../Components/Header'
import NavFooter from '../Components/NavFooter'


export function ProductInfo() {
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        window.location.href = '/';
    }
    const items = JSON.parse(accessToken)
    var userId = items.user_id;
    
    const products = useSelector((state) => state.product.products)
    console.log(products);debugger
    // const [quantity, setQty] = useState('1')

    const location = useLocation()
    var id = location.state;

   
    const [counter, setCounter] = useState(1);
    const dispatch = useDispatch()
    let payload = {
        id: id
    }
    console.log(payload)
    useEffect(() => {
        // dispatch(fetchProductById(payload));debugger
    }, [])
   
    const addToCart = (item) => {
        console.log(item)
        let payloadCart = {
            user_id: userId,
            productId: item.id,
            product_name: item.product_name,
            quantity: counter,
            price: item.product_price
        }
        console.log(payloadCart)
        dispatch(addProductToCart(payloadCart));
    }
    
    const incrementBtn=()=>{
        setCounter(counter+1);
    }
    const decrementBtn=()=>{
        setCounter(counter-1)
    }

    return (
        <div>
            <Header />
            <div class="container">
                <div class="album">
                    <div class="container">
                        <div class="d-flex justify-content-around">
                            <div class="col-4">
                                <div class="card mb-4 box-shadow">
                                    <img class="card-img-top" width="100%" src={"http://localhost:3000/assets/" + id.image_url} alt="Card image cap" />
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="card-body">
                                    <h3>{id.product_name}</h3>
                                    <p class="card-text mt-2">{id.product_description}</p>
                                    <div class=" mt-2">
                                    {/* <div className='productQty d-flex align-items-center'>
                                            <h6 className='mr-2'>Quantity:</h6><input value={quantity} onChange={(evt) => setQty(evt.target.value)} />
                                        </div> */}
                                        <div class="d-flex align-items-center">
                                                            <button
                                                                aria-label="Increment value"
                                                                style={{ height: "fit-content" }}
                                                            onClick={() => incrementBtn()}
                                                            >+</button>
                                                            <p class="mt-3 ml-1 mr-1" value={counter} onChange={(evt)=>setCounter(evt.target.value)}>{counter}</p>
                                                            <button
                                                                style={{ height: "fit-content" }}
                                                                aria-label="Decrement value"
                                                            onClick={() =>decrementBtn()}
                                                            >-</button>

                                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <h6 class="color-primary">Price:</h6>
                                            <h6>₹{id.product_price}</h6>
                                        </div>
                                    </div>
                                    <div class="btn-group mt-5">
                                        <button type="button" class="btn btn-lg btn-outline-success" data-toggle="modal"
                                            data-target="#productModal" onClick={() => addToCart(id)}>Cart</button>
                                        <button type="button" class="btn btn-lg btn-danger">Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavFooter />
        </div>
    )
}


