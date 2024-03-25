

export default function Suggestions({filteredVideo, handleClick}){

    return <div className="dropDown">
            <ul>
                {
                    filteredVideo && filteredVideo.length
                    ? filteredVideo.map((item, index) => <li key={index} onClick={handleClick}>{item}</li>)
                    : null
                }
            </ul>
        </div>
}