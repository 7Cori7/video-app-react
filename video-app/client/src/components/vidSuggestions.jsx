import { useEffect, useState } from "react";

export default function VidSuggestions({data, openVid, videoId, closeVid}){

    const [sugVids, setSugVids] = useState([]);
    const [showBtn, setShowBtn] = useState('flex');

    let currentItem = 3;

    function handleLoadMore(){

        const elementList = document.querySelectorAll('li');

        for(let i = currentItem; i < currentItem + 3; i++){

            if(elementList[i]){
                elementList[i].style.display = 'flex';
            }
        }
        currentItem += 3;

        if(currentItem >= elementList.length){

            setShowBtn('none');
        }
    }

    function handleSugVid(id, index){

        closeVid();
        openVid(id, index);
    }

    useEffect(()=>{

        const filterOut = data.filter(i=> i.id !== videoId);
        setSugVids(filterOut);
    
    }, []);

    console.log(sugVids)

    return <>

        <ul>  
            {
                sugVids && sugVids.length && sugVids.length > 0
                ? sugVids.map((item, index)=>(

                    <li key={index}>
                        <img src={item.thumb} alt={item.title} width={250} onClick={()=>handleSugVid(item.id, index)} />
                    </li>
                ))
                :null
            }
        </ul>
        <button style={{display: showBtn}} onClick={handleLoadMore}>Load More</button>
    </>
}