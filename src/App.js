
import './App.css';
import Login from './componet/login/Login';
import {useState} from 'react';

function App() {
  const [mode, setMode] = useState('home')
  const handleModeApp = (m)=>{
    console.log('jjjjjd')
    setMode(m)
  }
  
  return (
    <div className="App">
      <Login mode={mode} handleModeApp={handleModeApp}/>
    </div>
  );
}

export default App;
