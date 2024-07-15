

export default function Header({user, backToMain, handleLogOut}){

    return <div className="header">

        <h2 onClick={backToMain} style={{cursor:'pointer'}}>Video App</h2>

        <div className="user">
            <h3>{user}</h3>
            <button onClick={handleLogOut}>logout</button>
        </div>
    </div>
}