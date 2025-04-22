import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminLogin() {
    const [cookies, setCookie, removeCookie] = useCookies(['admin_id']);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            admin_id: '',
            password: ''
        },
        onSubmit: (admin) => {
            axios.get(`http://127.0.0.1:5050/admin`)
                .then(res => {
                    var record = res.data.find((item: any) => item.admin_id === admin.admin_id);
                    if (record) {
                        if (record.password === admin.password) {
                            setCookie('admin_id', admin.admin_id);
                            navigate('/admin-dash');
                        } else {
                            alert('Invalid Password');
                        }
                    }
                });
        }
    });

    return (
        <div style={{
            backgroundImage: "url('/Login-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "between",
            alignItems: "center"
        }}>
            <div style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: "30px",
                marginLeft : '10px' ,
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "400px"
            }}>
                <h3 className="text-center fw-bold mb-4">Admin Login</h3>

                <form onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt className="my-2">Admin Id</dt>
                        <dd>
                            <input
                                onChange={formik.handleChange}
                                type="text"
                                name="admin_id"
                                className="form-control"
                                placeholder="Enter Admin ID"
                                required
                            />
                        </dd>

                        <dt className="my-2">Password</dt>
                        <dd>
                            <input
                                onChange={formik.handleChange}
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter Password"
                                required
                            />
                        </dd>
                    </dl>

                    <button type="submit" className="btn btn-success w-100 mt-3">Login</button>
                </form>
            </div>
        </div>
    );
}