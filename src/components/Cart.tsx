import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addItem, delItem } from '../redux/action'
import { NavLink } from 'react-router-dom'


const Cart = () => {
    const state = useSelector((state:any)=> state.handleCart)
    const dispatch = useDispatch()

    

    const handleClose = (item:any) => {
        dispatch(delItem(item))
    }

    const handleIncreament = (item:any) => {
        dispatch(addItem(item))
    }

    const handleDecreament = (item:any) => {
        dispatch(delItem(item))
    }

    const cartItems = (cartItem:any) => {

        console.log("state : " , state)

        return(
            <div className="px-4 my-5 bg-light rounded-3" key={cartItem?.id}>
                <div className="container py-4">
                    <button onClick={()=>handleClose(cartItem)} className="btn-close float-end" aria-label="Close"></button>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={cartItem?.thumbnail} alt={cartItem?.title} height="200px" width="180px" />
                        </div>
                        <div className="col-md-4">
                            <h3>{cartItem?.title}</h3>
                            <p className="lead fw-bold">
                                {cartItem?.qty} X {cartItem?.price} = $ {cartItem?.qty * cartItem?.price}
                            </p>
                            <button className='btn btn-outline-dark me-4' onClick={() => handleDecreament(cartItem)}><i className='fa fa-minus' /></button>
                            <span className='me-4'>{cartItem?.qty}</span>
                            <button className='btn btn-outline-dark me-4' onClick={() => handleIncreament(cartItem)}><i className='fa fa-plus' /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>Your Cart is Empty</h3>
                    </div>
                    </div>
                </div>
        );
    }

    const button = () => {
        return(
            <div className="container">
                <div className="row">
                    <NavLink to="/checkout" className="btn btn-outline-primary mb-5 w-25 mx-auto">Proceed To checkout</NavLink>
                </div>
            </div>
        );
    }

    return (
        <>
            {state?.length === 0 && emptyCart()}
            {state?.length !== 0 && state?.map(cartItems)}
            {state?.length !== 0 && button()}
        </>
    )
}

export default Cart