import bg from '../assets/bg.jpg'
import Products from './Products'

const Home = () => {
    return (
        <div className="hero">
            <div className="card bg-dark text-white border-0">
                <img src={bg} className="card-img" alt="background" />
                <div className="card-img-overlay d-flex flex-column justify-content-around text-end">
                    <div className="container">
                    <h5 className="card-title display-4 fw-bolder mb-0">NEW SEASON ARRIVAL</h5>
                    <p className="card-text lead fs-3">CHECK OUT ALL THE TRENDS</p>
                    </div>
                </div>
            </div>
            <Products />
        </div>
    )
}

export default Home