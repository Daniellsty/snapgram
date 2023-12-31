import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import logo from "../../assets/images/logo (1).svg";
import Loader from "@/components/ui/shared/Loader";
import { NavLink, useNavigate } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";

import { userSignInAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    userSignInAccount();

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const newUser = await signInAccount(values);

    if (!newUser) {
      return toast({
        variant: "destructive",
        title: "sign in failed.Please try again.  ",
        //  action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      return toast({
        variant: "destructive",
        title: "sign in failed.Please try again.  ",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col ">
        <img src={logo} alt="logo" />
        <h2 className="h3-bold md:h2-bold sm:pt-4">Log in to your account</h2>
        <p className="text-light small-medium md:base-regular mt-2">
          Welcome Back! Please , Enter Your Details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-5 w-full mt-4 flex-col">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary" type="submit">
            {isSigningIn ? (
              <div className="flex-center ">
                <Loader />
                <span className="mx-2"> Loading...</span>
              </div>
            ) : (
              "Log in"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account ?
            <NavLink
              className="text-primary-500 text-small-semibold ml-1"
              to={"/Sign-up"}>
              Sign up
            </NavLink>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
