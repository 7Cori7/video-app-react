import { useContext } from "react";
import { GlobalContext } from "../../context/context";
import { useNavigate } from "react-router-dom";


export default function Login(){

    const { user, setUser, setLogin }= useContext(GlobalContext);

    function handleSubmit(){

        if(!user){
            alert('Please write your username to login')
        }else{
            setLogin(true);
            navigate('/');
        }
    }

    const navigate = useNavigate();

    return <div className="login-screen">

        <h2>Video App</h2>
            
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Please write your username" value={user} onChange={(e)=>setUser(u=>u=e.target.value)} />
            <button type="submit">Login</button>
        </form>
    </div>
}