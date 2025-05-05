import { BrowserRouter, Route, Routes  } from 'react-router-dom'
import './index.css'
import Header from './components/header/index'
import React from 'react'
import Home from './Pages/Home/index'


function App() {
  return (
  <>
  <BrowserRouter> 
  <Header/>
  <Routes>
    <Route path={"/"} exact={true} element={<Home/>} />
  </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
