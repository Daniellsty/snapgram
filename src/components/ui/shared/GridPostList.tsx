import { useUserContext } from '@/context/AuthContext'
import { Models } from 'appwrite'
import { NavLink } from 'react-router-dom'
import PostStats from './PostStats'

type GridPostListProps={
    posts:Models.Document[];
    showUser?:boolean;
    showStats?:boolean;
}

const GridPostList = ({posts,showUser=true,showStats=true}:GridPostListProps) => {

    const {user} = useUserContext();

    

  return (
    <ul className='grid-container'>

       
        {posts && posts.map((post)=>{
         
            
        return(
            <li
            key={post.$id}
            className='relative min-w-80 h-80'
            >
                
                <NavLink
                className='grid-post_link'
                to={`/posts/${post.$id}`}>
                    <img 
                    src={post?.imageUrl}
                    className='h-full w-full object-cover'
                    alt="image" />
                </NavLink>
            <div className='grid-post_user'>
                {showUser && (
                    <div className='flex items-center justify-start gap-2 flex-1'>
                        <img 
                        className='h-8 w-8 rounded-full'
                        src={post?.creator?.imageUrl} alt="post" />
                        <p className='line-clamp-1'>{post?.creator?.name}</p>
                    </div>
                ) }

                {showStats && <PostStats post={post}  userId={user.id} /> }
            </div>
            </li>
          )})}
    </ul>
  )
}

export default GridPostList