import { INewUser } from '@/types'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
    useInfiniteQuery,
  } from '@tanstack/react-query'
import { SignInAccount, createUserAccount } from '../appwrite/api'

  export const userCreateUserAccountMutation = ()=> {
    return useMutation({

        mutationFn:(user:INewUser)=> createUserAccount(user)

    })
  }

  export const userSignInAccount = ()=> {
    return useMutation({

        mutationFn:(user:{email:string,password:string})=> SignInAccount(user)

    })
  }