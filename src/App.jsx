import { useState } from 'react'
import { ReactDOM } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TempDataFetcher from './components/TempDataFetcher';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<TempDataFetcher/>}></Route>
          <Route path='/hej' element={<div>inte hej hej</div>}> </Route>
          <Route path='*' element={<div>error</div>}></Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
