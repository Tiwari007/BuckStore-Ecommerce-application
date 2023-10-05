import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

import { useDispatch } from 'react-redux'
import { addItem } from '../redux/action'

type productT = {
    id: number,
    title: string,
    thumbnail: string,
    price: number,
    category: string,
    rating: number,
    description: string
}

const Product = () => {


    const { id } = useParams()
    const [product, setProduct] = useState<productT>()
    const [loading, setLoading] = useState(false)


    const dispatch = useDispatch()
    const addProduct = (product: any) => {
        dispatch(addItem(product))
    }


    useEffect(() => {

        const getProduct = async () => {
            setLoading(true)
            const response = await fetch(`https://dummyjson.com/products/${id}`)
            setProduct(await response.json())
            setLoading(false)
        }

        getProduct()
    }, [])



    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={400} width={400} />
                </div>
                <div className="col-md-6" style={{lineHeight: 2}}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={80} />
                    <Skeleton height={50} width={100} />
                </div>
            </>
        )
    }

    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6">
                    <img src={product?.thumbnail} alt={product?.title} height="400px" width="400px" />
                </div>
                <div className="col-md-6">
                    <h4 className='text-black-50 text-uppercase'>{product?.category}</h4>
                    <h1 className='display-5'>{product?.title}</h1>
                    <p className="lead fw-bolder">Rating {product?.rating}<i className='fa fa-star'></i></p>
                    <h3 className="display-6 fw-bold my-4">
                        $ {product?.price}
                    </h3>
                    <p className="lead">
                        {product?.description}
                    </p>
                    <button className="btn btn-outline-dark me-2" onClick={() => addProduct(product)}>Add to Cart</button>
                    <NavLink to="/cart" className="btn btn-dark me-2">Go to Cart</NavLink>
                </div>
            </>
        )
    }


    return (
        <div className='container py-5'>
            <div className="row py-5">
                {
                    loading ? <Loading /> : <ShowProduct />
                }
            </div>
        </div>
    )
}

export default Product