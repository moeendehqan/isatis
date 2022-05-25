
import './App.css';
import Login from './componet/login/Login';
import Desk from './componet/desk/desk';
import {useState} from 'react';

function App() {
  const [mode, setMode] = useState('desk')
  const [user ,setuser] = useState('moeen')
  const handleModeApp = (m,u)=>{
    setMode(m)
    setuser(u)
  }
  
  return (
    <div className="App">
      <Login mode={mode} handleModeApp={handleModeApp}/>
      <Desk mode={mode} handleModeApp={handleModeApp} user={user}/>
    </div>
  );
}

export default App;
