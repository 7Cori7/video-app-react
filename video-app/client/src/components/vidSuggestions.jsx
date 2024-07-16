import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function VidSuggestions({data, params}){

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

    useEffect(()=>{

        setSugVids(data);
    
    }, [params]);

    return <>

        <ul>  
            {
                sugVids && sugVids?.length && sugVids?.length > 0
                ? sugVids.map((item, index)=>(

                    <li key={index}>
                        <Link to={`/video/${item?.id}`}>
                            <img src={item?.thumb} alt={item?.title} width={250} />
                        </Link>
                    </li>
                ))
                :null
            }
        </ul>
        <button style={{display: showBtn}} onClick={handleLoadMore}>Load More</button>
    </>
}