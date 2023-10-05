import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NavLink } from 'react-router-dom'

type dataT = {
  id: number,
  title: string,
  thumbnail: string,
  price: number,
  category: string
}

const Products = () => {

  const [data, setData] = useState<dataT[]>([])
  const [filter, setFilter] = useState<dataT[]>(data)
  const [loading, setLoading] = useState(false)
  let componentMounted = true




  useEffect(() => {


    const fetchData = async () => {
      setLoading(true)

      const response = await fetch("https://dummyjson.com/products")
      if (componentMounted) {
        setData(await response.clone().json().then(res => res.products))
        setFilter(await response.json().then(res => res.products))
        setLoading(false)
        console.log("filtered data", filter);

      }

      return () => {
        componentMounted = false
      }
    }


    fetchData()
  }, [])

  console.log("data :- ", data)
  const filterCategories = [...new Set(data.map(ele => ele.category))]
  console.log("category data", filterCategories)

  const Loading = () => {
    return (
      <>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      </>
      
    )
  }

  const Product = ({product}:any) => {
    return (
      
      <div className="col-md-3 mb-4">
        <div key={product.id} className="card h-100 text-center p-4" style={{ "width": "18rem" }}>
          <img src={product.thumbnail} height="250px" className="card-img-top" alt={product.title} />
            <div className="card-body">
              <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
              <p className="card-text lead fw-bold">$ {product.price}</p>
              <NavLink to={`/product/${product.id}`} className="btn btn-outline-dark">Buy Now</NavLink>
            </div>
        </div>
      </div>
      
    )
  }

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <div className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</div>
          {/* <div className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>Men's Clothing</div>
          <div className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>Woman's Clothing</div>
          <div className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>Jwellery</div>
          <div className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>Electronics</div> */}

          {
            filterCategories.map((ele, index) => {
              return (
                <div className="btn btn-outline-dark me-2" onClick={() => setFilter(data.filter(val => val.category === ele))} key={index}>{ele}</div>
              )
            })
          }
        </div>
        {
          filter.map((product, index) => {
            return (
              <Product product={product} key={index}/>
            )
          })
        }
      </>
    )

  }


  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  )
}

export default Products