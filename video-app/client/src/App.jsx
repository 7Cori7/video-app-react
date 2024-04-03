import { useEffect, useState } from "react";
import VideoApp from "./components/VideoApp.jsx";
import Footer from "./components/footer.jsx";
import getData from "./data.js";

function App() {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  async function fetchVideos(){

    try{

      setLoading(true);
      const response = await getData();

      if(response && response.length > 0){
        setLoading(false);
        setData(response);
      }
      
    }catch(error){
      console.log(error)
      setLoading(false);
      setError(error);
      throw new Error(error);
    }
  }

  useEffect(()=>{

    fetchVideos();
  }, []);

  return <>
    <VideoApp data={data} loading={loading} error={error} />
    <Footer />
  </>
}

export default App;
