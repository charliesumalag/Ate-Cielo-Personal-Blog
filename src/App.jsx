import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Blog from './components/Blog'
import { SearchProvider } from "./context/SearchContext";
import PageNotFound from './components/PageNotFound'
import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import EditProfile  from './pages/EditProfile';
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Create from "./pages/dashboard/post/Create";
import MyPost from "./pages/dashboard/post/MyPost";
import Category from "./pages/dashboard/Category";
import CategoryMain from "./pages/dashboard/category/Create";
import { AppContext } from "./context/AppContext";

const App = () => {
  const {user, loading} = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element=
          {
            <SearchProvider>
               <Layout />
            </SearchProvider>
          }>
          <Route path='/register' element={ <AuthRegister />}></Route>
          <Route path='/editprofile' element={ <EditProfile />}></Route>
          <Route path='/login' element={ <AuthLogin />}></Route>
          <Route index element={ <Home />}></Route>
          <Route path='about' element={<About />}></Route>
          <Route path='contact' element={<Contact />}></Route>
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="*" element={ <PageNotFound />} />
        </Route>
        <Route path="/dashboard" element={ loading || user  ? <DashboardLayout /> : <AuthLogin />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="create" element={<Create />}></Route>
          {/* <Route path="category" element={<Category />}></Route> */}
          <Route path="category" element={<CategoryMain />}></Route>
          <Route path="mypost" element={<MyPost />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
