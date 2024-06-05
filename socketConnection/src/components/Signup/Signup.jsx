import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Input, Button, Logo} from "../";
import authentication from "../../authentication/authentication";
import { localAuthLogin } from "../../features/authSlice";

const Signup = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");

    const handleSignup = async (data) => {
        setError("");
        try {
            const createdUser = await authentication.createAccount(data);
            if (createdUser) {
                const userData = await authentication.getCurrentUser();
                if (userData) {
                    dispatch(localAuthLogin({userData}));
                }
            }
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    }
    
    return (
        <div className="w-full max-w-md mx-auto p-8 shadow-lg rounded">
            <div className="flex justify-center py-8 gap-4 items-baseline">
            <h2 className="text-center text-4xl font-semibold">Signup to</h2>
                <Logo />
            </div>
            <p className="text-center">Are you already a user of socketConnection ? <span className="text-nowrap">go here to <Link className="text-blue-400 text-nowrap" to="/login">Sign In</Link>.</span></p>
            <div className="my-8">
                {error && <p className="text-red-600">{error}</p>}
                <form onSubmit={handleSubmit(handleSignup)}>
                    <Input 
                        type="text"
                        label="Full Name: " 
                        placeholder="Enter your full name" 
                        {...register("fullName", {
                            required: true,
                            pattern: /^[A-Za-z]+$/i
                        })}
                    />
                    <Input 
                        type="email"
                        label="Email: " 
                        placeholder="Enter your email address" 
                        {...register("email", {
                            required: true,
                            pattern: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi
                        })}
                    />

                    <Input 
                        type="password"
                        label="Password: " 
                        placeholder="Enter your password " 
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button type="submit" className="bg-black text-blue-100 dark:bg-white dark:text-black rounded-full mt-4">Signup</Button>
                </form>
            </div>
        </div>
    )
}

export default Signup;