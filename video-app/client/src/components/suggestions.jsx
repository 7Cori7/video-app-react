import { useEffect, useState } from "react";

export default function Suggestions({url, openVid}){

    const [sugVids, setSugVids] = useState([]);


    async function getSuggestions(){
        
        try {

            const res = await fetch(url);
            const data = await res.json();

            if(data && data.length && data.length > 0){
                setSugVids(data);
            } 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{

        getSuggestions();
    }, []);

    return <ul>
        
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
}