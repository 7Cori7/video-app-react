import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/context";


export default function Header({user, backToMain}){

    const {setLogin, setUser, setShowFilteredVid, setFilteredVid} = useContext(GlobalContext);

    function handleLogOut(){
        sessionStorage.removeItem('user');
        localStorage.removeItem('current-vid');
        setShowFilteredVid(false);
        setFilteredVid(null);
        setLogin(false);
        setUser('');
    }

    return <div className="header">

        <Link to={'/'} onClick={backToMain} style={{textDecoration: 'none', color: 'white'}}>
            <h2>Video App</h2>
        </Link>

        <div className="user">
            <h3>{user}</h3>
            <button onClick={handleLogOut}>logout</button>
        </div>
    </div>
}