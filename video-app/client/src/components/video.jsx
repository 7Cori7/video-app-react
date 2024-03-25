import Comments from "./comments.jsx";

export default function Video({handleCloseVid, video, user}){

    return <div className="video">

        <button className="close-vid" onClick={handleCloseVid}>close video</button>
        <video src={video.sources[0]} controls autoPlay></video>
        <div className="video-title">
            <h3>{video.title}</h3>
            <p>Componente de likes</p>
        </div>
        <p>{video.description}</p>

        <Comments videoId={video.id} user={user} />
    </div>
}