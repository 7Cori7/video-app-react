import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import VidSuggestions from "../../components/vidSuggestions";
import Video from "../../components/video";
import Header from "../../components/header";

export default function VideoPage(){

    const {id} = useParams();

    const {videoList, user, backToMain, login} = useContext(GlobalContext);

    const [video, setVideo] = useState(null);

    async function filterVideo(){

        const vid = videoList.find(i => i.id === Number(id));
        setVideo(vid);
    };

    // Close video
    function handleCloseVid(){
        
        navigate('/');
    };

    const navigate = useNavigate();

    if(!login){
        navigate('/login');
    }

    useEffect(()=>{

        filterVideo();
        window.scrollTo(0, 0);
    }, [id]);

    return <>

        {/* HEADER */}
        <Header user={user} backToMain={backToMain} />
        <div className="video-container">

            {/* COMPONENTE DE VIDEO */}
            {
                video !== null
                ? <Video video={video} handleCloseVid={handleCloseVid} user={user} />
                : null
            }
                    
            {/* COMPONENTE DE LISTA DE VIDEOS SUGERIDOS */}
            {
                videoList && videoList.length > 0
                ? <div className="lista">
                        <VidSuggestions data={videoList.filter(i=> i.id !== Number(id))} closeVid={handleCloseVid} params={id} />
                    </div>
                : null
            }
        </div>
    </>
    
}