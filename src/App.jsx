import { useState } from 'react'
import { ReactDOM } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TempDataFetcher from './components/TempDataFetcher';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='flex'>
          <Sidebar />
          <Main />
        </div>
        <Routes>
          <Route path='/' element={<TempDataFetcher />}></Route>
          <Route path='/hej' element={<div>inte hej hej</div>}> </Route>
          <Route path='*' element={<div>error</div>}></Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
