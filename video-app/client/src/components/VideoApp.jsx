import { useState, useEffect } from "react";
import Video from "./video.jsx";
import './styles.css';
import SearchAutoCom from './search-autoCom/index.jsx';
import VidSuggestions from "./vidSuggestions.jsx";

export default function VideoApp({url}){

    const [videos, setVideos] = useState([]);

    const [videoIndex, setVideoIndex] = useState(()=>{
        const localValue = localStorage.getItem('vidIndx');
        if(!localValue) return -1;
        return JSON.parse(localValue);
    });

    const [showGrid, setShowGrid] = useState('flex');
    
    const [video, setVideo] = useState(()=>{
        const localValue = localStorage.getItem('current-vid');
        if(!localValue) return {};
        return JSON.parse(localValue);
    });

    const [user, setUser] = useState(()=>{
        const localValue = localStorage.getItem('user');
        if(!localValue) return '';
        return JSON.parse(localValue); 
    });

    const [login, setLogin] = useState(()=>{
        const localValue = localStorage.getItem('login');
        if(!localValue) return false;
        return JSON.parse(localValue);
    });

    const [showFilteredVid, setShowFilteredVid] = useState(false);
    const [filteredVid, setFilteredVid] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleVideoId(id, index){

        setVideoIndex(v=> v = index);
        setShowGrid(g=>g= 'none');

        const video = videos.filter(i => i.id === id);
        setVideo(video[0]);
        setShowFilteredVid(false); 
    }

    function handleCloseVid(){

        setVideoIndex(-1);
        setShowGrid('flex');
        setVideo({});
        getVideos();
        localStorage.removeItem('current-vid');
    }

    function handleSubmit(){

        if(!user){
            alert('Please write your username to login')
        }else{
            setLogin(true);
        }
    }

    function showVid(title){

        setShowFilteredVid(true);
        const showVid = videos.filter(i=> i.title === title);
        setFilteredVid(showVid[0]);
        setShowGrid('flex');
    }

    function backToMain(){

        setVideoIndex(-1);
        setShowGrid('flex');
        setFilteredVid([]);
        setShowFilteredVid(false);
        getVideos();
        localStorage.removeItem('current-vid');
    }

    function handleLogOut(){
        setLogin(false);
        localStorage.removeItem('user');
        localStorage.removeItem('current-vid');
        setUser('');
    }

    async function getVideos(){
        
        try {

            setLoading(true);
            const res = await fetch(url);
            const data = await res.json();

            if(data && data.length && data.length > 0){
                setLoading(false);
                setVideos(data);
            } 
        } catch (error) {
            console.log(error)
            setError(error);
        }
    }

    // Get videos from the API
    useEffect(()=>{

        if(!video.length && videoIndex === -1){

            getVideos();
        }
    }, []);

    // Handle the login
    useEffect(()=>{

        if(user && user.length > 0){

            localStorage.setItem('user', JSON.stringify(user));
        }

        localStorage.setItem('login', JSON.stringify(login));

    }, [login, user]);

    // Handle the current video showing
    useEffect(()=>{

        localStorage.setItem('current-vid', JSON.stringify(video));
        localStorage.setItem('vidIndx', JSON.stringify(videoIndex));

    }, [video, videoIndex]);


    if(!login){

        // PANTALLA DE LOGIN
        return <div className="login-screen">

            <h2>Video App</h2>
            
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Please write your username" value={user} onChange={(e)=>setUser(u=>u=e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>

    }else{

        return <div className="content-body">

            {/* HEADER */}
            <div className="header">

                <h2 onClick={backToMain} style={{cursor:'pointer'}}>Video App</h2>

                <div className="user">
                    <h3>{user}</h3>
                    <button onClick={handleLogOut}>logout</button>
                </div>
            </div>

            {/* SEARCH BAR */}
            <SearchAutoCom url={url} showVid={showVid} />

            { loading && <p style={{textAlign:'center'}}>⌛Loading data...Please, wait.</p> }
            { error !== null && <p>❌An error has occurred ! {error}</p> }

            {/* GRILLA DE VIDEOS */}
            <div className="grid-container">

                <div className="videos-grid">

                    {
                        videos && videos.length && videos.length > 0 && !showFilteredVid
                        ? videos.map((video, index) => (
                            <div key={index} className="video-card" style={{display:showGrid}}>
                                <img src={video.thumb} alt={video.title} width={400} onClick={()=>handleVideoId(video.id, index)} />
                                <h3>{video.title}</h3>
                            </div>
                        ))
                        : null
                    }

                    {
                        showFilteredVid && filteredVid
                        ?  <div className="video-card" style={{display:showGrid}}>
                                <img src={filteredVid.thumb} alt={filteredVid.title} width={400} onClick={()=>handleVideoId(filteredVid.id, 1)} />
                                <h3>{filteredVid.title}</h3>
                            </div>
                        : null
                    }
                </div>
            </div>

            {/* VIDEO */}
            {
                videoIndex !== -1 && !showFilteredVid ? <div className="video-container">

                    {/* COMPONENTE DE VIDEO */}
                    <Video video={video} user={user} handleCloseVid={handleCloseVid} url={url} />
                    
                    {/* COMPONENTE DE LISTA DE VIDEOS SUGERIDOS */}
                    <div className="lista">
                        <VidSuggestions url={url} openVid={handleVideoId} closeVid={handleCloseVid} videoId={video.id} />
                    </div>
                </div>
                : null
            } 
        </div>
    }
}