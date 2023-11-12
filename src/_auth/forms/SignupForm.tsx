import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import logo from "../../assets/images/logo (1).svg";
import Loader from "@/components/ui/shared/Loader";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserAccount } from "../../lib/appwrite/api";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { userCreateUserAccountMutation, userSignInAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate()
  const {checkAuthUser ,isLoading :isUserLoading  } = useUserContext();
  
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },  
  });  
  
  
    const {mutateAsync :createUserAccount ,isLoading : creatingUser} =userCreateUserAccountMutation();
    
    const {mutateAsync :signInAccount ,isLoading : signiningUser} =userSignInAccount();


  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    console.log(newUser);
    if(!newUser){
      return toast({
         variant: "destructive",
         title: "sign up failed.Please try again.  ",
        //  action: <ToastAction altText="Try again">Try again</ToastAction>, 
       }); 

    }   

    const session = await signInAccount({
      email:values.email,
      password:values.password
    })

    if(!session){
      return toast({
        variant: "destructive",
        title: "sign in failed.Please try again.  ",
     
      }); 
    };

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      form.reset();
      navigate('/')
    }else{
      return toast({
        variant: "destructive",
        title: "sign up failed.Please try again.  ",
     
      }); 
    }



  }    


  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col ">
        <img src={logo} alt="logo" />
        <h2 className="h3-bold md:h2-bold sm:pt-4">Create a new account</h2>
        <p className="text-light small-medium md:base-regular mt-2">
          To use Snapgram please , enter your details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-5 w-full mt-4 flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary" type="submit">
            {creatingUser ? (
              <div className="flex-center ">
                <Loader />
                <span className="mx-2"> Loading...</span>
              </div>
            ) : (
              "Sing up"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account ?
            <NavLink
              className="text-primary-500 text-small-semibold ml-1"
              to={"/Sign-in"}>
              Log in
            </NavLink>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
