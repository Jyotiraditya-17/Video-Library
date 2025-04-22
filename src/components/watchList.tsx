import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VideoContract } from "../contracts/video-contract";

export function WatchList() {
    const navigate = useNavigate();
    const watchlist = useSelector((state: any) => state.videos); // Access Redux state

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h3>My Watchlist</h3>
                <button className="btn btn-link" onClick={() => navigate("/user-dash")}>Back to Dashboard</button>
            </div>

            <section className="d-flex flex-wrap">
                {
                    watchlist && watchlist.length > 0 ? (
                        watchlist.map((v: VideoContract) =>
                            <div className="card p-2 mx-2" style={{ width: '300px' }} key={v.video_id}>
                                <div className="card-header">
                                    <iframe width='100%' height='250' src={v.url} title={v.title}></iframe>
                                </div>

                                <div className="card-body">
                                    <h5> {v.title} </h5>
                                    <p> {v.description} </p>
                                </div>

                                <div className="card-footer">
                                    <button className="btn bi bi-hand-thumbs-up"> {v.likes} </button>
                                    <button className="btn bi bi-hand-thumbs-down"> {v.dislikes} </button>
                                    <button className="btn bi bi-eye-fill"> {v.views} </button>
                                </div>
                            </div>
                        )
                    ) : (
                        <p>No videos in your watchlist.</p>
                    )
                }
            </section>
        </div>
    );
}