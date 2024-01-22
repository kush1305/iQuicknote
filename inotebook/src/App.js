
import './App.css';
import About from './component/About';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import NoteState from './context/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';

function App() {
  const[alert,setAlert] = useState(null);

  const showalert=(message,type)=>{

    setAlert({
      msg:message,
      type:type
    })

    setTimeout(()=>{
      setAlert(null)
    },1500)

  }
  return (
    <div >
    <NoteState>
    <BrowserRouter>
      <Navbar/>
      <Alert alert={alert}/>

      <div className="container">
      
       <Routes>
        
          
          <Route path="/home" element={<Home showalert={showalert}/> }/>
          <Route path="/about" element={<About/> }/>
          <Route path="/login" element={<Login showalert={showalert}/> }/>
          <Route path="/signup" element={<Signup showalert={showalert}/> }/>
          
        
       </Routes>
       </div>
    </BrowserRouter>
    </NoteState>
      
    </div>

  );
}

export default App;
