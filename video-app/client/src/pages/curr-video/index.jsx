import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import VidSuggestions from "../../components/vidSuggestions";
import Video from "../../components/video";
import Header from "../../components/header";

export default function VideoPage(){

    const {id} = useParams();
    const videoId = Number(id);

    const {videoList, user, backToMain, login, video, setVideo, loading, setLoading} = useContext(GlobalContext);

    async function filterVideo(){

        setLoading(true);
        const vid = videoList.find(i => i.id === videoId);
        if(vid){
            setLoading(false);
            setVideo(vid);
        }
    };

    // Close video
    function handleCloseVid(){

        localStorage.removeItem('current-video');
        navigate('/');
    };

    const navigate = useNavigate();

    if(!login){
        navigate('/login');
    };

    useEffect(()=>{

        filterVideo();
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(()=>{

        if(video && video !== null){

            return localStorage.setItem('current-video', JSON.stringify(video));
        }
    
        const localValue = localStorage.getItem('current-video');

        if(localValue !== null){
            setVideo(JSON.parse(localValue));
        }

    }, [video]);

    console.log(id)

    return <>

        {/* HEADER */}
        <Header user={user} backToMain={backToMain} />

        { loading && <p style={{textAlign:'center'}}>⌛Loading data...Please, wait.</p> }

        <div className="video-container">

            {/* COMPONENTE DE VIDEO */}
            {
                video && video !== null
                ? <Video video={video} handleCloseVid={handleCloseVid} user={user} />
                : null
            }
                    
            {/* COMPONENTE DE LISTA DE VIDEOS SUGERIDOS */}
            {
                videoList && videoList.length > 0
                ? <div className="lista">
                        <VidSuggestions data={videoList.filter(i=> i.id !== videoId)} closeVid={handleCloseVid} params={id} />
                    </div>
                : null
            }
        </div>
    </>
    
}