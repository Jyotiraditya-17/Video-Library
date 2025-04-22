import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CategoryContract } from "../contracts/category-contract";
import axios from "axios";
import { useFormik } from "formik";

export function AdminAddVideo() {

    const [categories , setCategories] = useState<CategoryContract[]>();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            video_id : 0 ,
            title : "",
            description : "",
            url : "" ,
            likes : 0 ,
            dislikes : 0 ,
            views : 0 ,
            category_id : 0 ,
        } ,
        onSubmit : (video) => {
            axios.post(`http://127.0.0.1:5050/add-video`,video)
            .then( () => {
                alert("Video added..")
                navigate('/admin-dash')
            })
        }
    })

    useEffect( () => {
        axios.get(`http://127.0.0.1:5050/categories`)
        .then(res => {
             res.data.unshift({category_id:-1 , category_name:"select category"});
            setCategories(res.data);
        })
    })

    return(
        <div>
            <h3> Add Video </h3>

            <form onSubmit={formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-9"> Video Id</dt>
                    <dd className="col-3">
                        <input onChange={formik.handleChange} type="number" name="video_id" />
                    </dd>

                    <dt className="col-9"> Title </dt>
                    <dd className="col-3">
                        <input onChange={formik.handleChange} type="text" name="title" />
                    </dd>

                    <dt className="col-9"> Description </dt>
                    <dd className="col-3">
                        <input onChange={formik.handleChange} type="text" name="description" />
                    </dd>

                    <dt className="col-9"> Url </dt>
                    <dd className="col-3">
                        <input onChange={formik.handleChange} type="text" name="url" />
                    </dd>

                    <dt className="col-9"> Likes </dt>
                    <dd className="col-3">
                        <input onChange={formik.handleChange} type="number" name="lkes" />
                    </dd>

                    <dt className="col-9"> Dislikes </dt>
                    <dd className="col-3">
                        <input onChange={formik.handleChange} type="number" name="dislkes" />
                    </dd>
                    
                    <dt className="col-9"> Views </dt>
                    <dd className="col-3">
                        <input onChange={formik.handleChange} type="number" name="views" />
                    </dd>

                    <dt className="col-9"> Category_id </dt>
                    <dd className="col-3">
                        <select onChange={formik.handleChange} name="category_id">
                            {
                                categories?.map(category =>
                                    <option key={category.category_id} value={category.category_id}> {category.category_name} </option>
                                )
                            }
                        </select>
                    </dd>

                </dl>

                <button type="submit" className="btn btn-primary mb-3"> Add Video </button>
            </form>
            <Link  to='/admin-dash'> Back to Dashboard </Link>
        </div>
    )
}