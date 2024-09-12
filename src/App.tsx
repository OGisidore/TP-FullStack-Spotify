import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import PrivateRoute from './guard/privates.routes/private.routes'
import { Admin } from './pages/Admin'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { PostId } from './pages/Post'
import { Posts } from './pages/Posts'
import { RequestResetPassword } from './pages/requestResetPassword'
import { Signup } from './pages/Signup'
import { Verification } from './pages/verification'
import { ResetPassword } from './pages/ResetPassword'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="h-full flex flex-col items-center dark:bg-background">
        <Header />
        <div className="container w-fit">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/posts"
              element={
                <PrivateRoute>
                  <Posts />
                </PrivateRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <PrivateRoute>
                  <PostId />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/request-reset-password"
              element={<RequestResetPassword />}
            />
            <Route path="/verification" element={<Verification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
