import { useEffect, useState } from "react";
import Suggestions from "./suggestions";
import './searchAuto.css';


export default function SearchAutoCom({data, showVid}){

    const [vid, setVid] = useState([]);
    const [searchParam, setSearchParam] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const [filteredVideo, setfilteredVideo] = useState([]);

    function handleChange(e){

        const query = e.target.value.toLowerCase();
        setSearchParam(s=>s=query);

        if(query.length > 1){

            const filteredData = vid && vid.length
            ? vid.filter(i => i.toLowerCase().indexOf(query) > -1)
            : []

            setfilteredVideo(f=>f=filteredData);
            
            if(filteredData && filteredData.length > 0){
                setShowDropDown(true);
            }
        }
        else{

            setShowDropDown(false);
        }
    }

    function handleClick(e){

        setShowDropDown(false);
        setSearchParam(s=>s=e.target.innerText);
        setfilteredVideo([]);

    }

    function handleShowVid(){

        showVid(searchParam);
        setSearchParam('');
    }

    useEffect(()=>{

        const vidTitles = data.map(i=> i.title);
        setVid(vidTitles);  

    }, [data]);

    return <div className="serach-ac-container">

        <div className="search-bar">

            <input type="text" name="search-user" placeholder="Search video here" value={searchParam} onChange={handleChange} />
            <button onClick={handleShowVid}>Search</button>

            {
                showDropDown && <Suggestions filteredVideo={filteredVideo} handleClick={handleClick} />
            }
        </div>


    </div>
}