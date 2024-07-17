import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import '../../styles.css';
import SearchAutoCom from '../../components/search-autoCom';
import Header from "../../components/header.jsx";
import { GlobalContext } from "../../context/context.jsx";
import { useNavigate } from "react-router-dom";



export default function Home(){

    const { videoList,
        loading,
        error,
        user,
        login, 
        backToMain,
        showFilteredVid,
        setShowFilteredVid,
        filteredVid,
        setFilteredVid }= useContext(GlobalContext);

    const navigate = useNavigate();

    function showVid(title){

        setShowFilteredVid(true);
        const showVid = videoList.find(i=> i.title === title);
        setFilteredVid(showVid);
    }

    function handleReload(){
        
        // Reload page
        setTimeout(()=>{
            navigate(0);
        },500)
    }

    // Handle the login
    useEffect(()=>{

        if(user && user.length > 0){

            sessionStorage.setItem('user', JSON.stringify(user));
        }

        sessionStorage.setItem('login', JSON.stringify(login));

        if(!login || user === ''){
            navigate('/login');
        }

    }, [login, user]);

    return <>

        {/* HEADER */}
        <Header user={user} backToMain={backToMain} />

        {/* SEARCH BAR */}
        <SearchAutoCom data={videoList} showVid={showVid} />

        { loading && <p style={{textAlign:'center'}}>⌛Loading data...Please, wait.</p> }
        { error !== null && <p>❌An error has occurred ! {error}</p> }

        {/* GRILLA DE VIDEOS */}
        <div className="grid-container">

            <div className="videos-grid">

                {
                    videoList && videoList.length && videoList.length > 0 && !showFilteredVid
                    ? videoList.map((video, index) => (

                        <div key={index} className="video-card" style={{display:'flex'}}>

                            <Link to={`/video/${video?.id}`} onClick={handleReload}>
                                <img src={video?.thumb} alt={video?.title} width={400} />
                                <h3>{video?.title}</h3>
                            </Link>

                        </div>
                    ))
                    : null
                }

                {
                    showFilteredVid && filteredVid
                    ?  <div className="video-card" style={{display:'flex'}}>
                            <Link to={`/video/${filteredVid.id}`} onClick={handleReload}>
                                <img src={filteredVid.thumb} alt={filteredVid.title} width={400} />
                                <h3>{filteredVid.title}</h3>
                            </Link>
                        </div>
                    : null
                }

            </div>
        </div>
    </>
}