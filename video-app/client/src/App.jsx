import VideoApp from "./components/VideoApp.jsx";
import Footer from "./components/footer.jsx";

function App() {

  const url = import.meta.env.VITE_REACT_APP_API_URL;

  return <>
    <VideoApp url={`${url}/data/video`} />
    <Footer />
  </>
}

export default App;
