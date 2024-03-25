import { useState, useEffect } from "react";
import Video from "./video.jsx";
import '/public/styles.css';
import SearchAutoCom from './search-autoCom/index.jsx';

export default function VideoApp({url}){

    const [videos, setVideos] = useState([]);
    const [videoIndex, setVideoIndex] = useState(-1);
    const [showGrid, setShowGrid] = useState('flex');
    const [video, setVideo] = useState({});
    const [user, setUser] = useState('');
    const [login, setLogin] = useState(false)
    const [showFilteredVid, setShowFilteredVid] = useState(false);
    const [filteredVid, setFilteredVid] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
    }

    useEffect(()=>{
        
        getVideos();

    }, []);


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
                    <button onClick={()=>setLogin(false)}>logout</button>
                </div>
            </div>

            {/* SEARCH BAR */}
            <SearchAutoCom url={url} showVid={showVid} />

            { loading && <p>⌛Loading data...Please, wait.</p> }
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
                    <Video video={video} user={user} handleCloseVid={handleCloseVid} />

                    {/* COMPONENTE DE LISTA DE VIDEOS SUGERIDOS */}
                    <div className="lista">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error architecto illum numquam saepe nihil itaque velit quidem, sunt fugit culpa magnam amet sint rem veritatis quas similique. Excepturi, tempora esse!
                    </div>
                </div>
                : null
            } 
        </div>
    }
}