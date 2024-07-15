import { Routes, Route } from 'react-router-dom';
import Footer from "./components/footer.jsx";
import Login from './pages/login';
import Home from './pages/home';
import Video from './pages/curr-video';
import NotFound from './pages/not-found';

function App() {

  return <div className='App'>

    <div className="content-body">

      <Routes>

        <Route path='/login' element={ <Login /> } />
        <Route path='/' element={ <Home /> } />
        <Route path='/video/:id' element={ <Video /> }/>
        <Route path='*' element={ <NotFound /> }/>

      </Routes>

      <Footer />

    </div>
  </div>
}

export default App;
