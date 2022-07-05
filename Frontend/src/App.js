import './App.css';
import Navbar from "./Components/Navbar"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

//pages
import Home from "./Pages/Home/Home"
import About from './Pages/About/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>

          <Routes>
            
            <Route path="/" element={<Home/>}></Route>
            

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
