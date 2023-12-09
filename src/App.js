import { Route, Routes,Navigate } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth';
import Home from './Pages/Home';
import ViewProfile from './Pages/ViewProfile';
import { useContext } from 'react';
import { tokenAuthorisationContext } from './Contexts/TokenAuth';


function App() {

  const {isAuthorized , setIsAuthorized} = useContext(tokenAuthorisationContext)

  return (
    <>  
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/home' element={ isAuthorized ? <Home/> : <Auth/>  }/>
      <Route path='/profile' element={ isAuthorized ? <ViewProfile/> : <Auth/>}/>
      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
      
    </>
  );
}

export default App;
