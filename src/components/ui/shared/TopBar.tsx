import  { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../button'
import { userSignOutAccount } from '@/lib/react-query/queriesAndMutation'
import { useUserContext } from '@/context/AuthContext'
import logo from "../../../assets/images/logo (1).svg"
import logout from "../../../assets/icons/logout.svg"
import profile from '../../../assets/icons/profile-placeholder.svg'
const TopBar = () => {

    const navigate = useNavigate();
    const {user} = useUserContext()
    const {mutate:signOut ,isSuccess} = userSignOutAccount();

    useEffect(()=>{

        if(isSuccess){
            navigate(0)
        }

    },[isSuccess])


  return (
    <section className='topbar'>
        <div className='flex-between py-4 px-5'>
        <NavLink
        className='flex gap-3 items-center'
        to={'/'}>
            <img 
            height={325}
            width={130}
            src={logo} alt="logo" />

        </NavLink>
        <div className='flex gap-4'>
        <Button variant= 'ghost'
        className='shad-button_ghost'
        onClick={ ()=> signOut()}
        >
            <img src={logout} alt="logout" />
        </Button>
        <NavLink
        className='flex-center gap-3'
        to={`/profile/${user.id}`} >
        <img src={user.imageUrl || profile } 
        alt="user profile"
        className='h-8 w-8 rounded-full'
         />
        </NavLink>
        </div>
        </div>
    </section>
  )
}

export default TopBar