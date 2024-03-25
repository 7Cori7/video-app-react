import VideoApp from "./components/VideoApp.jsx";

function App() {

  const url = 'http://localhost:3000/data/video';

  return <VideoApp url={url} />
}

export default App;
