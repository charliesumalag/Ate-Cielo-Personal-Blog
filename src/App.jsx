import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Shop from './components/Shop'
import Blog from './components/Blog'
import Tags from './components/Tags'
import { SearchProvider } from "./context/SearchContext";
import PageNotFound from './components/PageNotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          //2. provide the value to child component
          <SearchProvider>
            <Layout />
          </SearchProvider>
        }>
          <Route index element={ <Home />}></Route>
          <Route path='about' element={<About />}></Route>
          {/* <Route path='tags' element={<Tags />}></Route> */}
          <Route path='contact' element={<Contact />}></Route>
          {/* <Route path='shop' element={ <Shop /> }></Route> */}
          <Route path='blog' element={ <Blog /> }></Route>
          <Route path="*" element={ <PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
