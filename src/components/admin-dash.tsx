import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";
import { VideoContract } from "../contracts/video-contract";
import axios from "axios";

export function AdminDash() {

    const [cookies , setCookie , removeCookie] = useCookies(['admin_id']);

    const [video , setVideo] = useState<VideoContract[]>();

    const navigate = useNavigate();

    useEffect( () => {
        axios.get(`http://127.0.0.1:5050/videos`)
        .then(res => {
            setVideo(res.data);
        })
    })

    function signoutClick() {
        removeCookie('admin_id');
        navigate('/admin-login');
    }
    return(
        <div>
            <h3 className="d-flex justify-content-between mt-4"> 
                <span> Admin Dashboard </span> 
                <span> {cookies['admin_id']} </span>
                <span className="btn btn-danger" onClick={signoutClick}> Logout </span> 
            </h3>

            <div className="mt-4">
                <Link to='/add-video' className="btn btn-primary"> Add New Video </Link>
            </div>

            <table className="table table-hover caption-top">
                <caption> Uploaded Videos </caption>
                <thead>
                    <tr>
                        <th> Title </th>
                        <th> Preview </th>
                        <th> Actions </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        video?.map(v => 
                            <tr key={v.video_id}>
                                <td> {v.title} </td>
                                <td>
                                    <iframe src={v.url} width='300' height='200'></iframe>
                                </td>
                                <td>
                                    <Link to={`/edit-video/${v.video_id}`} className="btn btn-warning bi bi-pen-fill mx-2"></Link>
                                    <Link to={`/dlt-video/${v.video_id}`} className="btn btn-danger bi bi-trash-fill"></Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}