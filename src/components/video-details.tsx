import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { string } from "yup"
import { VideoContract } from "../contracts/video-contract";
import axios from "axios";

export function VideoDetails() {

    const {id} = useParams<{id : string}>();
    const [video , setVideo] = useState<VideoContract[]>();

    useEffect( () => {
        axios.get(`http://127.0.0.1:5050/videos/${id}`)
        .then(res => setVideo(res.data))
        .catch(err => console.log(err))
    } , [id]);

    return(
        <div>

            <section className="d-flex flex-wrap">
                            {
                                video?.map(v => 
                                    <div className="card p-2 mx-2" style={{width:'300px'}} key={v.video_id}>
                                        <div className="card-header">
                                            <iframe width='100%' height='250' src={v.url}></iframe>
                                        </div>

                                        <div className="card-body">
                                            <h5> {v.title} </h5>
                                            <p> {v.description} </p>
                                        </div>

                                        <div className="card-footer">
                                            <button className="btn bi bi-hand-thumbs-up"> {v.likes} </button>
                                            <button className="btn bi bi-hand-thumbs-down"> {v.dislikes} </button>
                                            <button className="btn bi bi-eye-fill"> {v.views} </button>
                                            <button className="btn bi bi-bookmark-plus"> Watch Later </button>
                                        </div>
                                    </div>
                                )
                            }
            </section>

        </div>
    )
}