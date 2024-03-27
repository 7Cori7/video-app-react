import like1 from './assets/like1.svg';
import like2 from './assets/like2.svg';
import dislike1 from './assets/dislike1.svg';
import dislike2 from './assets/dislike2.svg';
import { useState } from 'react';

export default function Likes(){

    const [totalLikes, setTotalLikes] = useState(10);
    const [totalDislikes, setTotalDislikes] = useState(50);

    const [likesCount, setLikesCount] = useState(0);
    const [disLikesCount, setDisLikesCount] = useState(0);
    
    const [clickLike, setClickLike] = useState(false);
    const [clickDis, setClickDis] = useState(false);

    function handleLike(){

        if(!clickLike){

            setClickLike(true);
            setClickDis(false);

            setLikesCount(l=> l = 1);
            setDisLikesCount(0);
            

            setTotalLikes(t=> t + 1);
            setTotalDislikes(t=> t - disLikesCount);

        }else{

            setClickLike(false);

            setLikesCount(0);

            setTotalLikes(t=> t - 1);
        }

    }

    function handleDislike(){

        if(!clickDis){

            setClickDis(true);
            setClickLike(false);

            setDisLikesCount(d=> d = 1);
            setLikesCount(0);
            

            setTotalDislikes(t=> t + 1);
            setTotalLikes(t=> t - likesCount);

        }else{

            setClickDis(false);
            
            setDisLikesCount(0);

            setTotalDislikes(t=> t - 1);
        }

    }


    /*
    Para que este componente tenga más funcionalidad se debe connectar a una base de datos que guarde los
    likes/dislikes por video y user y luego los imprima en pantalla.
    Pero eso no lo haré en este ejercico jejeje.
    */

    return <div className='likes-container'>

        <div className='row'>
            <img src={clickLike ? like2 : like1} alt="like icon" width={40} onClick={handleLike} />
            <span>{totalLikes}</span>
            
        </div>

        <div className='row'>
            <img src={clickDis ? dislike2 : dislike1} alt="dislike icon" width={40} onClick={handleDislike}  />
            <span>{totalDislikes}</span>
        </div>
    </div>
}