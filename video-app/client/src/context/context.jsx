import { createContext, useState, useEffect } from "react";
import getData from "../data.js";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [videoList, setVideoList] = useState([]);

    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);

    // To set the current video
    const [video, setVideo] = useState(null);

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

    // For the search component
    function showVid(title){

        setShowFilteredVid(true);
        const showVid = videoList.filter(i=> i.title === title);
        setFilteredVid(showVid[0]);
        setShowGrid('flex');
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
            likes,
            setLikes,
            comments,
            setComments,
            video,
            setVideo,
            user,
            setUser,
            login,
            setLogin,
            showVid
        }
    }>

        { children }

    </GlobalContext.Provider>
}