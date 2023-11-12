import { Outlet , Navigate } from "react-router-dom"
import sidebar from '../assets/images/pexels-ivan-bertolazzi-2681319.jpg'
const AuthLayout = () => {

  const isAuthenticated = false

  return (
    <>
      {isAuthenticated  ?
      (
        <Navigate to={'/'} />
      )

      :

      (
        <>
        <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet />
        </section>

      <img 
      src={sidebar} 
      alt="sidebar img"
      className="hidden  xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
        </>
      )


      }
    </>
  )
}

export default AuthLayout