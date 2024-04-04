import { useState } from 'react'
import { ReactDOM } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TempDataFetcher from './components/TempDataFetcher';



function App() {

  return (
    <>
      <BrowserRouter>
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
