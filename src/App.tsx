import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { VideoHome } from './components/video-home'
import { UserLogin } from './components/user-login'
import { UserRegister } from './components/user-register'
import { UserDash } from './components/user-dash'
import { AdminLogin } from './components/admin-login'
import { AdminDash } from './components/admin-dash'
import { AdminAddVideo } from './components/admin-addVideo'
import { AdminEditVideo } from './components/admin-editVideo'
import { AdminDltVideo } from './components/admin-deleteVideo'
import { SearchResult } from './components/search-result'
import { VideoDetails } from './components/video-details'
import { WatchList } from './components/watchList'

function App() {

  return(
    <div className=''>
      <BrowserRouter>
          {/* <header className='text-center mb-5'>
            <Link to='' className='text-center'> Video Library </Link>
          </header> */}

          <section>
            <Routes>
              <Route path='/' element={<VideoHome />} />
              <Route path='/user-login' element={<UserLogin />} />
              <Route path='/user-register' element={<UserRegister />} />
              <Route path='/user-dash' element = {<UserDash/>} />
              <Route path='/admin-login' element = {<AdminLogin />} />
              <Route path='/admin-dash' element = {<AdminDash />} />
              <Route path='/add-video' element = {<AdminAddVideo />} />
              <Route path='/edit-video/:id' element = {<AdminEditVideo />} />
              <Route path='/dlt-video/:id' element = {<AdminDltVideo />} />
              <Route path='/video/:id' element = {<VideoDetails />} />
              <Route path='/watchlist' element = {<WatchList />} />
            </Routes>
          </section>
      </BrowserRouter>
    </div>
  )
}

export default App
