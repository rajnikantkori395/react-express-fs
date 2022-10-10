import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/login';
import Home from './component/Home'


const App = () => {

  
  return (
    <div>
      <BrowserRouter>
      <Routes>
  <Route path="/" element={<Login />}/>
  <Route path="/Home" element={<Home />}/>
    </Routes></BrowserRouter>
    </div>
  )
}

export default App
