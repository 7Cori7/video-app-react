import VideoApp from "./components/VideoApp.jsx";
import Footer from "./components/footer.jsx";

function App() {
  
  const url = 'http://localhost:3000';

  return <>
    <VideoApp url={`${url}/data/video`} />
    <Footer />
  </>
}

export default App;
