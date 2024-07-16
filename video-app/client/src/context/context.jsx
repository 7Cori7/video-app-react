import { createContext, useState, useEffect } from "react";
import getData from "../data.js";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [videoList, setVideoList] = useState([]);

    // For the current video
    const [video, setVideo] = useState(()=>{
        const localValue = localStorage.getItem('current-video');
        if(!localValue) return null;
        return JSON.parse(localValue); 
    });
    
    const [showFilteredVid, setShowFilteredVid] = useState(false);
    const [filteredVid, setFilteredVid] = useState(null);

    // Set logged user
    const [user, setUser] = useState(()=>{
        const localValue = sessionStorage.getItem('user');
        if(!localValue) return '';
        return JSON.parse(localValue); 
    });
    const [login, setLogin] = useState(()=>{
        const localValue = sessionStorage.getItem('login');
        if(!localValue) return false;
        return JSON.parse(localValue);
    });

    // Back to homepage
    function backToMain(){

        localStorage.removeItem('current-video');
        setShowFilteredVid(false);
        setFilteredVid(null);
    }

    // Get the videos from API
    async function fetchVideos(){

        try{

            setLoading(true);
            const response = await getData();

            if(response && response.length > 0){
                setLoading(false);
                setVideoList(response);
            }
        
        }catch(error){
            console.log(error)
            setLoading(false);
            setError(error);
            throw new Error(error);
        }
    }

    useEffect(()=>{

        fetchVideos();
    }, []);

    return <GlobalContext.Provider value={
        {
            loading,
            setLoading,
            error,
            setError,
            videoList,
            setVideoList,
            user,
            setUser,
            login,
            setLogin,
            backToMain,
            showFilteredVid,
            setShowFilteredVid,
            filteredVid,
            setFilteredVid,
            video,
            setVideo
        }
    }>

        { children }

    </GlobalContext.Provider>
}