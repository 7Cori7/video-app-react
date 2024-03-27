import { useEffect, useState } from "react";

export default function VidSuggestions({url, openVid, videoId}){

    const [sugVids, setSugVids] = useState([]);
    const [showBtn, setShowBtn] = useState('flex');

    let currentItem = 3;

    async function getSuggestions(){
        
        try {

            const res = await fetch(url);
            const data = await res.json();

            if(data && data.length && data.length > 0){
                // filtrar todos los videos que no son el video actual.
                const filterOut = data.filter(i=> i.id !== videoId);
                setSugVids(filterOut);
            } 
        } catch (error) {
            console.log(error)
        }
    }

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

    useEffect(()=>{

        getSuggestions();
    }, []);

    return <>

        <ul>  
            {
                sugVids && sugVids.length && sugVids.length > 0
                ? sugVids.map((item, index)=>(

                    <li key={index}>
                        <img src={item.thumb} alt={item.title} width={250} onClick={()=>openVid(item.id, index)} />
                    </li>
                ))
                :null
            }
        </ul>
        <button style={{display: showBtn}} onClick={handleLoadMore}>Load More</button>
    </>
}