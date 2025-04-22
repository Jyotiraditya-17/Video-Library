import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function UserLogin() {

    const [cookies , setCookie , removeCookie] = useCookies(['userid']);


    let navigate = useNavigate();

    const formik = useFormik({
        initialValues : {
            userid : '' ,
            password : ''
        } ,
        onSubmit : (user) => {
            axios.get(`http://127.0.0.1:5050/users`)
            .then(res => {
                var record = res.data.find((item:any) => item.userid === user.userid);

                if(record) {
                    if(record.password === user.password) {
                        setCookie('userid' , user.userid);
                        navigate('/user-dash');
                    }
                    else {
                        alert('Invalid Password');
                    }
                }
                else {
                    alert('Invalid User ID');
                }
            })
        }
    })


    return(
        <div 
        style={{
            backgroundImage: "url('/Login-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "between",
            alignItems: "center"}}
        >
        
        <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "30px",
            marginLeft : '10px' ,
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            width: "400px"
        }}>
            <h3> User Login </h3>

            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt> User Id </dt>
                    <dd>
                        <input onChange={formik.handleChange} className="form-control" type="text" name="userid" />
                    </dd>

                    <dt> Password </dt>
                    <dd>
                        <input onChange={formik.handleChange} className="form-control" type="password" name="password" />
                    </dd>
                </dl>

                <button type="submit" className="btn btn-primary"> Login </button>
                <div className="my-2">
                    <Link to='/user-register'> New User Register </Link>
                </div>
            </form>
        </div>
        </div>
    )
}