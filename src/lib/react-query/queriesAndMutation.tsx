import { INewPost, INewUser } from '@/types'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    useInfiniteQuery,
  } from '@tanstack/react-query'
import { signInAccount, createUserAccount, signOutAccount, createPost, getRecentPosts } from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys'

  export const userCreateUserAccountMutation = ()=> {
    return useMutation({

        mutationFn:(user:INewUser)=> createUserAccount(user)

    })
  }

  export const userSignInAccount = ()=> {
    return useMutation({

        mutationFn:(user:{email:string,password:string})=> signInAccount(user)

    })
  }

  export const userSignOutAccount = ()=> {
    return useMutation({

        mutationFn: signOutAccount

    })
  }

  export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };

  export const useGetRecentPosts =()=>{
    return useQuery({
      queryKey:[QUERY_KEYS.GET_RECENT_POSTS] ,
      queryFn:getRecentPosts,
    })
  }