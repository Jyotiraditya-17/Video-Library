import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VideoContract } from "../contracts/video-contract";
import axios from "axios";
import { useFormik } from "formik";
import { CategoryContract } from "../contracts/category-contract";

export function AdminEditVideo() {

    const [video , setVideo] = useState<VideoContract>();
    const [categories , setCategories] = useState<CategoryContract[]>();

    let params = useParams();
    let navigate = useNavigate();



    useEffect( () => {
        
        axios.get(`http://127.0.0.1:5050/videos/${params.id}`)
        .then( res => {
            setVideo(res.data);
        })


        axios.get(`http://127.0.0.1:5050/categories`)
            .then(res => {
                 res.data.unshift({category_id:-1 , category_name:"select category"});
                setCategories(res.data);
            })
        
    } , [params.id])

    

    const formik = useFormik({
        initialValues: {
            video_id : video?.video_id ,
            title : video?.title ,
            description : video?.description ,
            url : video?.url ,
            likes : video?.likes ,
            dislikes : video?.dislikes ,
            views : video?.views ,
            category_id : video?.category_id
        } ,
        onSubmit : (video) => {
            axios.put(`http://127.0.0.1:5050/edit-video/${params.id}` , video);
            navigate('/admin-dash');
        } ,
        enableReinitialize : true
    })

    return(
        <div>
            <h3> Edit Video </h3>


            <form onSubmit={formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-9"> Video Id</dt>
                    <dd className="col-3">
                        <input value={formik.values.video_id} onChange={formik.handleChange} type="number" name="video_id" />
                    </dd>

                    <dt className="col-9"> Title </dt>
                    <dd className="col-3">
                        <input value={formik.values.title} onChange={formik.handleChange} type="text" name="title" />
                    </dd>

                    <dt className="col-9"> Description </dt>
                    <dd className="col-3">
                        <input value={formik.values.description} onChange={formik.handleChange} type="text" name="description" />
                    </dd>

                    <dt className="col-9"> Url </dt>
                    <dd className="col-3">
                        <input value={formik.values.url} onChange={formik.handleChange} type="text" name="url" />
                    </dd>

                    <dt className="col-9"> Likes </dt>
                    <dd className="col-3">
                        <input value={formik.values.likes} onChange={formik.handleChange} type="number" name="likes" />
                    </dd>

                    <dt className="col-9"> Dislikes </dt>
                    <dd className="col-3">
                        <input value={formik.values.dislikes} onChange={formik.handleChange} type="number" name="dislikes" />
                    </dd>
                    
                    <dt className="col-9"> Views </dt>
                    <dd className="col-3">
                        <input value={formik.values.views} onChange={formik.handleChange} type="number" name="views" />
                    </dd>

                    <dt className="col-9"> Category_id </dt>
                    <dd className="col-3">
                        <select value={formik.values.category_id} onChange={formik.handleChange} name="category_id">
                            {
                                categories?.map(category =>
                                    <option key={category.category_id} value={category.category_id}> {category.category_name} </option>
                                )
                            }
                        </select>
                    </dd>

                </dl>

                <button type="submit" className="btn btn-success mx-3"> Save Video </button>
                <Link to='/admin-dash' className="btn btn-warning"> Cancel </Link>

            </form>

            
        </div>
    )
}