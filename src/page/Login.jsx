import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="flex items-center justify-center flex-col text-center min-h-screen mt-3">

            <div className="flex flex-col items-center justify-center bg-[#EDDCD9] border-2 border-[#264143] rounded-2xl shadow-[3px_4px_0_1px_#E99F4C] px-8 py-6">

                <p className="text-[#264143] font-extrabold text-2xl ">LOGIN</p>

                <form className="mt-1">


                    {/* Email */}
                    <div className="flex flex-col items-start my-1">
                        <label className="font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="outline-none border-2 border-[#264143] shadow-[3px_4px_0_1px_#E99F4C] w-[290px] p-3 rounded text-[15px] focus:translate-y-1 focus:shadow-[1px_2px_0_0_#E99F4C]"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col items-start my-1">
                        <label className="font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="outline-none border-2 border-[#264143] shadow-[3px_4px_0_1px_#E99F4C] w-[290px] p-3 rounded text-[15px] focus:translate-y-1 focus:shadow-[1px_2px_0_0_#E99F4C]"
                        />
                    </div>

                    

                    {/* Login Button */}
                    <button
                        className="mt-2 w-[290px] p-4 bg-[#DE5499] font-extrabold rounded-xl shadow-[3px_3px_0_0_#E99F4C] text-[15px] hover:opacity-90 focus:translate-y-1 focus:shadow-[1px_2px_0_0_#E99F4C]"
                    >
                        Login
                    </button>

                    {/* Google Login */}
                    <button
                        type="button"
                        className="mt-3 w-[290px] p-3 bg-white border-2 border-[#264143] font-bold rounded-xl shadow-[3px_3px_0_0_#E99F4C] hover:bg-gray-100 flex items-center justify-center gap-2"
                    >
                        
                        Login with Google
                    </button>

                    {/* Already have account */}
                    <p className="mt-3 font-bold text-[#264143]">
                        “Don’t have an account?{" "}
                        <Link to="/register" className="font-extrabold text-[#264143] underline">
                            Register here
                        </Link>
                    </p>

                </form>
            </div>

        </div>
    );
};

export default Login;