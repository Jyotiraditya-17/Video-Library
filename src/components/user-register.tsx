import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"

export function UserRegister() {

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userid : '' ,
            username : '' ,
            password : '' ,
            email : '' ,
        } ,
        onSubmit : (user) => {
            axios.post(`http://127.0.0.1:5050/register-user` , user)
            .then( () => {
                console.log("posted..")
            })

            alert("Registered successfully..");
            navigate('/user-login');
        }
    })

    return(
        <div 
        style={{
            backgroundImage: "url('/Register-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"}}
        >
            
        
        <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            width: "400px"
        }}>
            <form onSubmit={formik.handleSubmit} >

                <h3 className="text-center"> User Register </h3>

                <dl>
                    <dt> User Id </dt>
                    <dd>
                        <input type="text" name="userid" onChange={formik.handleChange} className="form-control" />
                    </dd>

                    <dt> User Name </dt>
                    <dd>
                        <input type="text" name="username" onChange={formik.handleChange} className="form-control" />
                    </dd>

                    <dt> Password </dt>
                    <dd>
                        <input type="password" name="password" onChange={formik.handleChange} className="form-control" />
                    </dd>

                    <dt> Email </dt>
                    <dd>
                        <input type="email" name="email" onChange={formik.handleChange} className="form-control" />
                    </dd>
                </dl>

                <button type="submit" className="btn btn-outline-primary"> Register </button>
                <p className="text-success my-2"> Already have an account <Link to='/user-login'> login </Link> </p>
            </form>
        </div>
        </div>
        
    )
}