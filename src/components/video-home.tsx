import { Link } from "react-router-dom";

export function VideoHome() {

    return(
        <div className="text-center" style={{
            backgroundImage: "url('/Register-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
        }}>

            <div>
                <h1 className="fw-bold text-dark"> VidNest </h1>
            </div>
            
            <div className="d-flex justify-content-center align-items-center" style={{marginTop:'200px'}}>
                <Link className="btn btn-dark mx-2" to='/user-login'> User Login </Link>
                <Link className="btn btn-warning" to='/admin-login'> Admin Login </Link>
            </div>
        </div>
    )
}