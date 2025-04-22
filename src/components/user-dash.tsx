import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { VideoContract } from "../contracts/video-contract";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addToSavelist } from "../slicers/video-slicer";
import { useDispatch } from "react-redux";
import store from "../store/store";

export function UserDash() {

    const [cookies , setCookie , removeCookie] = useCookies(['userid']);
    const [videos , setVideos] = useState<VideoContract[]>();
    const [searchTerm , setSearchTerm] = useState<string>('');
    const [searchedVideos , setSearchedVideos] = useState<VideoContract[]>();

    let navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect( () => {
        if(searchedVideos) {
            setVideos(searchedVideos);
        }
        else {
            axios.get(`http://127.0.0.1:5050/videos`)
            .then(res => {
            setVideos(res.data);
          })
        }
        
    } , [searchedVideos])


    

    /*function handleViewClick(videoId : string) {
        axios.post(`http://127.0.0.1:5050/videos/${videoId}/inc-views`)
        .then(() => {
            navigate(`/video/${videoId}`)
        })
        .catch(err => {
            console.log(err);
        })
    }*/

        function handleSearch() {
            if(!searchTerm.trim()) {
                axios.get(`http://127.0.0.1:5050/videos`)
                .then( res => {
                    setVideos(res.data);
                })
            }
            else {
                console.log(searchTerm)
                axios.get(`http://127.0.0.1:5050/get-video/by-category`,{params:{name : searchTerm}})
                .then ( res => {
                    console.log(res);
                    console.log("videos");
                    setSearchedVideos(res.data);
                })
                .catch(err => {
                    console.log(err);
                    setVideos(undefined);
                })
            }
        }


    function AddtoWatchList(video : VideoContract) {
        dispatch(addToSavelist(video));
        alert("Added to Watch List");
    }

    function ViewWatchList() {
        console.log(store.getState().videos);
    }

    function logoutClick() {
        removeCookie('userid');
        navigate('/user-login')
    }


    return(
        <div>
            
            <div className="d-flex justify-content-between">
                <h3>
                    {/* <span> User Dashboard </span> */}
                    <span> {cookies['userid']} </span>
                </h3>


                <div className="input-group w-25 m-2">
                    <input type="text" className="form-control" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for a video : Java , React " />
                    <button onClick={handleSearch} className="btn btn-warning bi bi-search"></button>
                </div>

                <div>
                    <span onClick={() => navigate('/watchlist')} className="btn bi bi-bookmark-plus-fill"> My List </span>
                    <span className="btn btn-link" onClick={logoutClick}> logout </span>
                </div>

            </div>

            <section className="d-flex flex-wrap">
                {
                    videos?
                    videos?.map(v => 
                        <div className="card p-2 mx-2" style={{width:'300px'}} key={v.video_id} >
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
                                <button className="btn bi bi-bookmark-plus" onClick={() => {AddtoWatchList(v)}}> Watch Later </button>
                            </div>
                        </div>
                    ) : "No Videos Found.."
                }
            </section>
        </div>
    )
}