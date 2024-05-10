import React, { useState, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup()

    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const navigate = useNavigate();
    const doSignup = async (e) => {
        e.preventDefault()

        await signup(name, email, password)
    }
    // const { login } = AuthData();
    const [formData, setFormData] = useReducer((formData, newItem) => { return ({ ...formData, ...newItem }) }, { userName: "", password: "" })
    const [errorMessage, setErrorMessage] = useState(null)

    // const doLogin = async () => {
    //     try {
    //         const apiResponse = await registerTeacher(name, email, password);
    //         console.log('@@message', apiResponse)
    //         saveUserDetails(JSON.stringify(apiResponse))
    //         if (apiResponse.isSuccess) {
    //             const loginResponse = await loginTeacher(email, password)
    //             console.log('@@loginResponseloginResponse', loginResponse)
    //             saveToken(loginResponse.token)
    //             if (loginResponse.isSuccess) {
    //                 navigate("/home")
    //             }
    //         }
    //         alert(message); 
    //     } catch (error) {
    //         console.log('@@error', error)
    //     }
    // }

    return (
        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0 bg-gray-darker">
            <div className="max-w-screen-xl shadow sm:rounded-lg flex justify-center flex-1 h-full items-center bg-gray-darker">
                {/* <div className="flex-1 bg-blue-900 text-center hidden md:flex  border-4 border-red-900">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div> */}
                <div className="lg:w-2/6 xl:w-4/12 p-6 sm:p-12 justify-center items-center border-2 border-gray-lighter rounded-2xl">
                    <div className=" flex flex-col items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-2xl font-extrabold text-white">
                                Student Sign up
                            </h1>
                            <p className="text-[12px] text-gray-500 inline-flex items-center text-xs font-thin text-center hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
                                Hey enter your details to create your account
                            </p>
                        </div>
                        <div className="w-full flex-1 mt-8">
                            <div className="mx-auto max-w-xs flex flex-col gap-4">
                                {/* <input
                                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="Enter your name"
                                />
                                <input
                                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                <input
                                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="tel"
                                    placeholder="Enter your phone"
                                /> */}
                                <div className="flex flex-col">
                                    <div className="flex relative ">
                                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-darker border-l border-b  border-gray-lighter text-gray-500 shadow-sm text-sm">
                                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                                </path>
                                            </svg>
                                        </span>
                                        <input type="text" id="name" className=" rounded-r-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Enter name" onChange={handleNameChange} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex relative ">
                                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-darker border-l border-b  border-gray-lighter text-gray-500 shadow-sm text-sm">
                                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                                </path>
                                            </svg>
                                        </span>
                                        <input type="email" id="email" className=" rounded-r-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Enter email"  onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <div className="flex relative ">
                                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-darker border-l border-b  border-gray-lighter text-gray-500 shadow-sm text-sm">
                                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                                </path>
                                            </svg>
                                        </span>
                                        <input type="password" id="password" className=" rounded-r-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your password" onChange={handlePasswordChange} />
                                    </div>
                                </div>
                                {/* <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button> */}
                                <button type="submit" onClick={doSignup} className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Sign Up
                                </button>
                                <p className="mt-6 text-xs  text-center  
                
                text-[12px] text-gray-500 items-center font-thin hover:text-gray-700 dark:text-gray-100 dark:hover:text-white
                ">
                                    Already have an account?{" "}
                                    <Link to={'/login'}>
                                        <span className="font-semibold text-gray-100 underline">Sign in</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup