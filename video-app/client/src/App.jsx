import { Routes, Route } from 'react-router-dom';
import Footer from "./components/footer.jsx";
import Login from './pages/login';
import Home from './pages/home';
import VideoPage from './pages/curr-video';
import NotFound from './pages/not-found';

function App() {

  return <>

    <div className="content-body">

      <Routes>

        <Route path='/login' element={ <Login /> } />
        <Route path='/' element={ <Home /> } />
        <Route path='/video/:id' element={ <VideoPage /> }/>
        <Route path='*' element={ <NotFound /> }/>

      </Routes>

    </div>
    
    <Footer />
  </>
}

export default App;
