import { useState, useEffect } from "react";

export default function Comments({videoId, user}){

    const [vidComments, setVidComments] = useState(()=>{
        const localValue = localStorage.getItem('VidComments');
        if(!localValue) return [];
        return JSON.parse(localValue);
    });
    const [newComment, setNewComment] = useState('');
    const [currComments, setCurrComments] = useState([]);

    useEffect(()=>{

        if(vidComments.length > 0){

            localStorage.setItem('VidComments', JSON.stringify([...vidComments]));

            const currCom = vidComments.filter(i => i.videoId === videoId);

            setCurrComments(c=> c = currCom);
        }
    },[vidComments]);

    useEffect(()=>{

        if(vidComments.length > 0){

            localStorage.setItem('VidComments', JSON.stringify([...vidComments]));

            const currCom = vidComments.filter(i => i.videoId === videoId);

            setCurrComments(c=> c = currCom);
        }
    }, []);

    function makeComment(){

        if(!user || !newComment){

            alert('to post a comment you must fill all input fields');
        }else{

            const obj = {
                videoId,
                id: crypto.randomUUID(2),
                comment: newComment,
                user
            }
            setVidComments(c => [...c, obj]);
            setNewComment('');
        }
    }

    return <div className="comments-container">

        {
            currComments && currComments.length && currComments.length > 0
            ? <h2>Comments({currComments.length})</h2>
            : <h2>Comments</h2>
        }
        <div className="current-comments">
            {
               currComments && currComments.length && currComments.length > 0
               ? currComments.map(i => (
                <div key={i.id} className="comment">
                    <h3>{i.user}</h3>
                    <p>{i.comment}</p>
                    <hr />
                </div>
               ))
               : <p>Be the first user to leave a comment!</p> 
            }
        </div>

        <div className="input-container">
            <h3>Make a comment!</h3>
            <textarea name="make-comment" value={newComment} onChange={(e)=>setNewComment(c=>c=e.target.value)} placeholder="Write here to leave a comment." />
            <button onClick={makeComment}>Post Comment</button>
        </div>
    </div>
}