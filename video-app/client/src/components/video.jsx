import Comments from "./comments.jsx";
import Likes from "./likes.jsx";

export default function Video({handleCloseVid, video, user}){

    const {sources, title, id, description} = video;

    return <div className="video">

        <button className="close-vid" onClick={handleCloseVid}>close video</button>
        <video src={sources} controls autoPlay></video>
        <div className="video-title">
            <h3>{title}</h3>
            <Likes />
        </div>

        <p>{description}</p>

        <Comments videoId={id} user={user} />
    </div>
}