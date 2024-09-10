import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Posts } from './pages/Posts'
import { Home } from './pages/Home'
import Header from './components/Header/Header'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Admin } from './pages/Admin'
import { PostId } from './pages/Post'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="h-full flex flex-col items-center dark:bg-background">
        <Header />
        <div className="container w-fit">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post/:id" element={<PostId />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
