import './App.css'
import {
   Routes, Route,
} from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetail, Profile, RootLayout, Saved, UpdateProfile } from './_root/Pages';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import { Toaster } from "@/components/ui/toaster"
 

function App() {

  return (
    <>
      <main className='flex h-screen '>
      <Routes>
        {/* pulic routes */}
        <Route element={<AuthLayout/>} >
        <Route path='/sign-in' element={<SigninForm/>} />
        <Route path='/sign-up' element={<SignupForm/>} />

        </Route>


        {/* private routes */}

        <Route  element={<RootLayout/>} >
        <Route index element={<Home/>} />
        <Route path='/explore' element={<Explore/>} />
        <Route path='/saved' element={<Saved/>} />
        <Route path='/all-Users' element={<AllUsers/>} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:id' element={<EditPost />} />
        <Route path='/posts/:id' element={<PostDetail  />} />
        <Route path='/profile/:id/*' element={<Profile  />} />
        <Route path='/update-profile/:id' element={<UpdateProfile  />} />

        </Route>

      </Routes>

      <Toaster/>
      </main>
    
    </>
  )
}

export default App
