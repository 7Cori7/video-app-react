import Comments from "./comments.jsx";
import Likes from "./likes.jsx";

export default function Video({handleCloseVid, video, user}){


    return <div className="video">

        <button className="close-vid" onClick={handleCloseVid}>close video</button>
        <video controls autoPlay>
            <source src={video?.sources} />
        </video>
        <div className="video-title">
            <h3>{video?.title}</h3>
            <Likes />
        </div>

        <p>{video?.description}</p>

        <Comments videoId={video?.id} user={user} />
    </div>
}