import { useReducer, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthData } from "../../services/auth/index"
import { Link, useNavigate } from "react-router-dom";
import { InputWrapper, ButtonPrimary } from "../../components";
import { registerTeacher, loginTeacher } from "../../services/api/client";
import { saveToken, saveUserDetails } from "../../services/async-storage";
import { useLogin } from "../../hooks/useLogin";
import { Toaster, toast } from 'sonner'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const { login, error, isLoading } = useLogin()

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };
    const handlePasswordBlur = (e) => {
        setIsPasswordFocused(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();

    // console.log('@@email', email)
    // console.log('@@password', password)

    // const doLogin = async (event) => {
    //     event.preventDefault(); 
    //     try {
    //         const loginResponse = await loginTeacher(email, password)
    //         console.log('@@loginResponseloginResponse', loginResponse)
    //         if (loginResponse && loginResponse.token) {
    //             saveToken(loginResponse.token);
    //             navigate("/home");
    //         } else {
    //             console.error("Login failed: Token not received");
    //         }
    //     } catch (error) {
    //         console.log('@@error', error)
    //     }
    // }
    const doLogin = async (e) => {
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            toast.error('Please enter an email address');
            return;
        }
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        if(!password){
            toast.error('Please enter password');
            return
        }
        const jsondata = await login(email, password)
        if(jsondata?.message){
            toast.error(jsondata?.message);
            return
        }
    }

    return (
        // <div className="heroContainer h-dvh">
        //     <div className=" p-3 border items-center justify-center flex flex-col w-2/4 h-2/3 ">
        //         <div className="py-2 w-3/4 items-center justify-center">
        //             <h2 className="text-center font-extrabold">Login in to your account</h2>
        //         </div>
        //         <div className="inputs w-2/4 ">
        //             <div className="input m-2 pb-2 w-100 ">
        //                 <InputWrapper
        //                     type="text"
        //                     placeholder="name"
        //                     value={name}
        //                     onChange={handleNameChange}
        //                 >
        //                     Name
        //                 </InputWrapper>

        //             </div>
        //             <div className="input m-2 py-2 w-100 ">
        //                 <InputWrapper
        //                     type="email"
        //                     placeholder="email"
        //                     value={email}
        //                     onChange={handleChange}
        //                 >
        //                     Email
        //                 </InputWrapper>
        //             </div>
        //             <div className="m-2 pb-2 w-100 ">
        //                 <InputWrapper
        //                     type="password"
        //                     name="Password"
        //                     value={password}
        //                     onChange={handlePasswordChange}
        //                 >
        //                     Password
        //                 </InputWrapper>
        //             </div>
        //             {errorMessage ?
        //                 <div className="error">{errorMessage}</div>
        //                 : null}
        //         </div>
        //         <ButtonPrimary onClick={doLogin} type="button">
        //             Login
        //         </ButtonPrimary>
        //     </div>
        // </div>
        <div className=" flex flex-col h-full w-full justify-center items-center">
             <Toaster closeButton={true} richColors duration={2000} position="top-center" />
            <div className="flex flex-col w-full max-w-sm px-4 py-8 bg-gray-darker rounded-2xl shadow  sm:px-6 md:px-8 lg:px-10 border-2 border-gray-lighter ">
                <div className="self-center mb-6 text-xl font-light sm:text-2xl text-white">
                    Login
                </div>
                {/* <label className="flex items-center mb-3 space-x-3">
                    <input type="checkbox" name="checked-demo" className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-red-500 checked:border-transparent focus:outline-none" />
                    <span className="font-normal text-gray-700 dark:text-white">
                        Gray
                    </span>
                </label> */}
                
                <div className="mt-8">
                    <form action="#" autoComplete="off">
                        <div className="flex flex-col mb-2">
                            <div className="flex relative ">
                                <span className={`rounded-l-md inline-flex  items-center px-3 border-t bg-gray-darker border-l border-b  border-gray-lighter text-gray-500 shadow-sm text-sm ${isFocused ? 'ring-2 ring-purple-600' : ''}`}>
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                        </path>
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    id="sign-in-email"
                                    className={`rounded-r-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ${isFocused ? 'ring-2 ring-purple-600' : ''}`}
                                    placeholder="Enter email"
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <div className="flex relative ">
                                <span className={`
                                rounded-l-md inline-flex  items-center px-3 border-t bg-gray-darker border-l border-b  border-gray-lighter text-gray-500 shadow-sm text-sm ${isPasswordFocused ? 'ring-2 ring-purple-600' : ''}
                                `}>
                                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                        </path>
                                    </svg>
                                </span>
                                <input type="password" id="sign-in-password" className={`
                                rounded-r-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your password  ${isPasswordFocused ? 'ring-2 ring-purple-600' : ''}
                                `}
                                    placeholder="Enter password"
                                    onChange={handlePasswordChange}
                                    onFocus={handlePasswordFocus}
                                    onBlur={handlePasswordBlur}
                                />
                            </div>
                        </div>
                        <div className="flex items-center mb-6 -mt-4">
                            <div className="flex ml-auto">
                                <a href="#" className="inline-flex text-xs font-thin sm:text-sm text-gray-100 hover:text-white">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <button
                                type="submit"
                                className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                                onClick={doLogin}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center justify-center mt-6">
                    <Link to={'/signup'} className="inline-flex items-center text-xs font-thin text-center text-white hover:text-white">
                        <span className="ml-2">
                            You don&#x27;t have an account?
                        </span>
                    </Link>
                </div>
            </div>
            {/* <h1>hello</h1> */}
        </div>

    )
}

export default Login