import { useContext } from 'react';
import Header from '../../components/header';
import { GlobalContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

export default function NotFound(){

    const { user, backToMain, login } = useContext(GlobalContext);

    const navigate = useNavigate();

    if(!login){
        navigate('/');
    };

    return <>

        <Header user={user} backToMain={backToMain} />
        <div className="not-found-page">

        <h1>404 Page doesn't exist 😵</h1>
    </div>
    </>
}