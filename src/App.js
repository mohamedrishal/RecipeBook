import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth';
import Home from './Pages/Home';
import ViewProfile from './Pages/ViewProfile';


function App() {
  return (
    <>  
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/profile' element={<ViewProfile/>}/>
    </Routes>
      
    </>
  );
}

export default App;
