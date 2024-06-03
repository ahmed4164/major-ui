import React, { useState, useReducer, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup';
import { Progress, Drawer, Dropdown, Button, Alert } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { getColleges } from '../../services/api/client';
import { FaUniversity } from "react-icons/fa";
import { Toaster, toast } from 'sonner'
import { FaChevronDown } from "react-icons/fa";


const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [password, setPassword] = useState('');
    const [collegeCode, setCollegeCode] = useState('');
    const [reEnteredpassword, setReEnteredPassword] = useState('');
    const [isReEnterPasswordFocused, setIsReEnterPasswordFocused] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState('');
    const [selectedRole, setSelectedRole] = useState('student');
    const { signup, error, isLoading } = useSignup()
    const [isFocused, setIsFocused] = useState(false);
    const [indexValue, setIndexValue] = useState(0)
    const [collegesList, setCollegesList] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [branch, setBranch] = useState();
    const [section, setSection] = useState();
    const [year, setYear] = useState();
    const [selectedCollege, setSelectedCollege] = useState();
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [branchList, setBranchList] = useState(['CSE', 'IT', 'ECE', 'MECH', 'CIVIL', 'AIDS']);
    const [sectionList, setSectionList] = useState(['A', 'B', 'C']);
    const [yearList, setYearList] = useState(['1', '2', '3', '4']);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (item) => {
        setSelectedItem(item);
        console.log(`Selected item: ${item}`);
    };
    useEffect(() => {
        const url = 'https://api.data.gov.in/resource/44bea382-c525-4740-8a07-04bd20a99b52?api-key=579b464db66ec23bdd000001901f96ff01d94c6b58bc2949f9576916&format=json&limit=1000&filters%5Buniversity_name%5D=Osmania%20University%2C%20Hyderabad%20(Id%3A%20U-0027)&filters%5Bstate_name%5D=Telangana';

        async function fetchData() {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();

                // Process data to remove ID from college_name
                const cleanedData = data?.records?.map(entry => ({
                    ...entry,
                    college_name: entry.college_name.split(' (Id:')[0] // Remove ID part from college_name
                }));

                console.log(cleanedData);

                setCollegesList(cleanedData)
                setFilteredColleges(cleanedData);
                // Process the data here
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }

        fetchData();
    }, [])

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleNameFocus = () => {
        setIsNameFocused(true);
    };

    const handleNameBlur = () => {
        setIsNameFocused(false);
    };
    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterColleges(query);
    };

    const selectCollege = (sno, college) => {
        setCollegeCode(sno);
        handleClose();
        setSearchQuery('');
        setSelectedCollege(college);
        // setSelectedCollege()
        // const state = event.target.value;
        // setStateQuery(state);
        // filterColleges(searchQuery, state);

    };
    const selectBranch = (branch) => {
        setBranch(branch);
        handleBranchClose();
    };
    const selectSection = (branch) => {
        setSection(branch);
        handleSectionClose();
    };
    const selectYear = (branch) => {
        setYear(branch);
        handleYearClose();
    };
    const customDropdownTheme = {
        arrowIcon: "h-4 w-4",
        content: "py-1 focus:outline-none",
        floating: {
            animation: "transition-opacity",
            arrow: {
                base: "absolute z-10 h-2 w-2 rotate-45",
                style: {
                    dark: "bg-red-900",
                    light: "bg-white",
                    auto: "bg-white"
                },
                placement: "-4px"
            },
            base: "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
            content: "py-1 text-sm text-gray-700",
            divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
            header: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
            //   hidden: "invisible opacity-0",
            //   item: {
            //     container: "",
            //     base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
            //     icon: "mr-2 h-4 w-4"
            //   },
            //   style: {
            //     dark: "bg-red-900 text-white",
            //     light: "border border-gray-200 bg-white text-gray-900",
            //     auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white"
            //   },
            style: {
                dark: "bg-transparent text-white dark:bg-transparent", // Changed to transparent
                light: "border border-gray-200 bg-transparent text-gray-900", // Changed to transparent
                auto: "border border-gray-200 bg-transparent text-gray-900 dark:border-none dark:bg-transparent dark:text-white" // Changed to transparent
            },
            target: "w-full h-full"
        },
        inlineWrapper: "flex items-center",
        // Custom styles for the dropdown button to remove background
        button: {
            base: "bg-transparent text-white",
            hover: "border border-gray-200 bg-transparent text-gray-900",
            focus: "border border-gray-200 bg-transparent text-gray-900 dark:border-none dark:bg-transparent dark:text-white"
        }
    };


    const filterColleges = (nameQuery) => {
        const filtered = collegesList.filter(college => {
            const matchesName = college.college_name.toLowerCase().includes(nameQuery.toLowerCase());
            // const matchesState = stateQuery === '' || college.state_name.toLowerCase() === stateQuery.toLowerCase();
            return matchesName;
        });
        setFilteredColleges(filtered);
    };

    const handleRoleChange = (role) => {
        setSelectedRole(role);
    };
    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleReEnterPasswordChange = (e) => {
        setReEnteredPassword(e.target.value);
    };
    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };
    const handlePasswordBlur = (e) => {
        setIsPasswordFocused(false);
    };
    const handleReEnterPasswordFocus = () => {
        setIsReEnterPasswordFocused(true);
    };
    const handleReEnterPasswordBlur = (e) => {
        setIsReEnterPasswordFocused(false);
    };
    const navigate = useNavigate();
    const doSignup = async (e) => {
        e.preventDefault()
        // if (!email) {
        //     console.log('@@email',email)
        //     return; // Exit the function early if email is empty
        // }

        if (indexValue == 2) {
            if (!password) {
                toast.error('Please enter password');
                return;
            }
            if (!reEnteredpassword) {
                toast.error('Please reenter password');
                return;
            }
            if (password !== reEnteredpassword) {
                toast.error('Password & Confirm Password do not match');
            }
        }
        // toast.success('Please enter an email address');
        await signup(name, email, password, selectedRole, selectedCollege, collegeCode, password, branch, section, year)
    }
    const [isOpen, setIsOpen] = useState(false);
    const [isBranchOpen, setIsBranchOpen] = useState(false);
    const [isSectionOpen, setIsSectionOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);
    const handleBranchClose = () => setIsBranchOpen(false)
    const handleSectionClose = () => setIsSectionOpen(false)
    const handleYearClose = () => setIsYearOpen(false)
    const handleClose = () => setIsOpen(false);

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
    // const customTheme = {
    //     // base: 'relative',
    //     // label: 'text-sm font-medium',
    //     // bar: 'overflow-hidden rounded-full',
    //     // color: {
    //     //     purple: 'bg-purple-300',
    //     // },
    //     size: {
    //         // sm: 'h-20',
    //         // md: 'h-2.5',
    //         // lg: 'h-4',
    //         // xl: 'h-6',
    //     },
    // };
    const customTheme = {
        size: {
            sm: 'h-1.5',
        },
        color: {
            purple: 'bg-purple-600',
        },
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const steps = ['Step 1', 'Step 2', 'Step 3']; // Example steps
    const currentStep = 2; // The current step index

    const increment = () => {
        if (indexValue == 0) {
            if (!name) {
                toast.error('Please enter name');
                return;
            }
            if (!email) {
                toast.error('Please enter an email address');
                return;
            }
            if (!emailRegex.test(email)) {
                toast.error('Please enter a valid email address');
                return;
            }
        }

        if (indexValue == 1) {
            if (!selectedCollege) {
                toast.error('Please select a college');
                return;
            }
            if (!branch && selectedRole== 'student') {
                toast.error('Please select a branch');
                return;
            }
            if (!section && selectedRole== 'student') {
                toast.error('Please select a section');
                return;
            }
            if (!year && selectedRole== 'student') {
                toast.error('Please select a year');
                return;
            }
           
        }

        // Increment index if all checks are passed
        setIndexValue((previousValue) => previousValue + 1);
    }


    return (
        <div className="lg:h-[100vh] bg-gray-darker justify-center items-center lg:flex w-screen">
            {/* <div className="max-w-screen shadow sm:rounded-lg flex justify-center flex-1 h-full items-center bg-gray-darker"> */}
            {/* <Toaster
                toastOptions={{
                    style: { background: 'red' },
                    className: 'my-toast',
                }}
            /> */}
            <Toaster closeButton={true} richColors duration={2000} position="top-center" />
            <div className="lg:w-2/4  w-screen lg:h-screen justify-center items-center px-10 hidden py-10 lg:block  lg:py-0 bg-gray-lighter">
                {/* <div
                    className="bg-contain bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
                    }}
                ></div> */}

                <div
                    className=" flex justify-center items-center h-full "
                >
                    <div className='text-4xl ffont-bold tracking-tight text-white' >
                        <div className='py-10'>
                            <h1>Unlock Your Potential with AI
                            </h1>
                        </div>
                        <div className=' text-gray-400 text-lg font-bold' >
                            <h3>Discover the power of AI-driven learning and take your education to new heights.
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' lg:w-2/4  h-full items-center '>
                <div className='w-fullitems-center flex-col  justify-between h-full'>
                    <div className='relative w-full justify-between items-center gap-3 pb-4'>
                        <div className='absolute flex gap-3 w-full' >
                            {steps.map((step, index) => (
                                <div key={index} className="w-1/3">
                                    <div>
                                        <div className="w-full overflow-hidden  bg-gray-200 dark:bg-gray-700 h-1.5">
                                            <div className={`space-x-2  text-center  ${index < indexValue
                                                ? 'bg-purple-400'
                                                : index === indexValue
                                                    ? 'bg-purple-600'
                                                    : 'bg-gray-400'
                                                } font-medium leading-none text-cyan-300 dark:text-cyan-100  h-1.5`}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className=' lg:w-2/3 xl:w-4/6 w-full  p-6 sm:p-12 justify-center items-center h-full my-10 border-4'> */}
                    <div className='flex justify-center items-center h-screen'>
                        <div className=" lg:w-2/3 xl:w-4/6 w-4/6 sm:p-8 p-6 justify-center items-center border-2 border-gray-lighter rounded-2xl ">
                            {
                                indexValue == 0 ? (
                                    <div className=" flex flex-col items-center justify-center">
                                        <div className="text-center">
                                            <h1 className="text-2xl font-extrabold text-white">
                                                Sign up
                                            </h1>
                                            <h3 className="text-[12px] inline-flex items-center text-xs font-thin text-center text-gray-100 hover:text-white">
                                                Hey enter your details to create your account
                                            </h3>
                                        </div>
                                        <div className="w-full flex-1 mt-8">
                                            <div className="mx-auto max-w-xs flex flex-col gap-4">
                                                <ul className="grid w-full gap-6 md:grid-cols-2">
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id="hosting-small"
                                                            name="hosting"
                                                            value="hosting-small"
                                                            className="hidden peer"
                                                            required
                                                            checked={selectedRole === 'student'}
                                                            onChange={() => handleRoleChange('student')}
                                                        />
                                                        <label
                                                            htmlFor="hosting-small"
                                                            className="inline-flex items-center border-2 border-gray-lighter justify-between w-full rounded-lg cursor-pointer hover:text-gray-300 peer-checked:text-purple-600 peer-checked:border-purple-600 text-gray-400 bg-gray-darker hover:bg-gray-900 p-2"
                                                        >
                                                            <div className="block">
                                                                <div className="w-full">Student</div>
                                                            </div>
                                                            <svg
                                                                className="w-5 h-5 ms-3 rtl:rotate-180"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 14 10"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                                                />
                                                            </svg>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id="hosting-big"
                                                            name="hosting"
                                                            value="hosting-big"
                                                            className="hidden peer"
                                                            checked={selectedRole === 'teacher'}
                                                            onChange={() => handleRoleChange('teacher')}
                                                        />
                                                        <label
                                                            htmlFor="hosting-big"
                                                            className="inline-flex items-center justify-between w-full p-2 border-2 border-gray-lighter  rounded-lg cursor-pointer hover:text-gray-300 bg-gray-darker peer-checked:text-purple-600 peer-checked:border-purple-600 text-gray-400 hover:bg-gray-900"
                                                        >
                                                            <div className="block">
                                                                <div className="w-full">Teacher</div>
                                                            </div>
                                                            <svg
                                                                className="w-5 h-5 ms-3 rtl:rotate-180"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 14 10"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                                                />
                                                            </svg>
                                                        </label>
                                                    </li>
                                                </ul>

                                                <div className="flex flex-col">
                                                    <div className="flex relative ">
                                                        <span className={`rounded-l-md inline-flex  items-center px-3 border-t bg-gray-darker border-l border-b  border-gray-lighter text-gray-500 shadow-sm text-sm ${isNameFocused ? 'ring-2 ring-purple-600' : ''}`}>
                                                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                                                </path>
                                                            </svg>
                                                        </span>
                                                        <input type="text" id="name" className=" rounded-r-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                            placeholder="Enter name"
                                                            onChange={handleNameChange}
                                                            onFocus={handleNameFocus}
                                                            onBlur={handleNameBlur}

                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="flex relative ">
                                                        <span className={`rounded-l-md inline-flex  items-center px-3 border-t bg-gray-darker border-l border-b  border-gray-lighter text-gray-500 shadow-sm text-sm ${isFocused ? 'ring-2 ring-purple-600' : ''}`}>
                                                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                                                </path>
                                                            </svg>
                                                        </span>
                                                        <input type="email" id="email" className=" rounded-r-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Enter email"
                                                            onChange={handleChange}
                                                            onFocus={handleFocus}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="flex flex-col mb-6">
                                                    <div className="flex relative ">
                                                        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-gray-darker border-l border-b  border-gray-lighter text-gray-500 shadow-sm text-sm">
                                                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                                                </path>
                                                            </svg>
                                                        </span>
                                                        <input type="password" id="password" className=" rounded-r-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your password" onChange={handlePasswordChange} />
                                                    </div>
                                                </div> */}

                                                <button type="submit" onClick={increment} className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                                    Continue
                                                </button>
                                                <h3 className="mt-6 text-xs  text-center  
                
                text-[12px] items-center font-thin text-gray-100 hover:text-white
                ">
                                                    Already have an account?{" "}
                                                    <Link to={'/login'}>
                                                        <span className="font-semibold text-gray-100 underline">Sign in</span>
                                                    </Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                ) : indexValue == 1 ? (
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="text-center">
                                            <h1 className="text-2xl font-extrabold text-white">
                                                Student Sign up
                                            </h1>
                                            <h3 className="text-[12px] inline-flex items-center text-xs font-thin text-center text-gray-100 hover:text-white">
                                                Enter your college details
                                            </h3>
                                        </div>
                                        <div className="w-full flex-1 mt-8">
                                            <div className="mx-auto max-w-xs flex flex-col gap-4">
                                                <div className="flex flex-col">
                                                    <form className="flex items-center w-full mx-auto">
                                                        <label htmlFor="simple-search" className="sr-only">Search</label>
                                                        <div className="relative w-full">
                                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                                                </svg>
                                                            </div>
                                                            <input type="text" value={selectedCollege} disabled={true} id="simple-search" className=" border  text-sm rounded-lg  block w-full ps-10 p-2.5 bg-gray-darker border-gray-lighter placeholder-gray-400 text-white " placeholder="Select college name..." required />
                                                        </div>
                                                        <button type="button" onClick={() => setIsOpen(true)} className="p-2.5 ms-2 text-sm font-medium text-white rounded-lg border   focus:ring-4 focus:outline-nonedark:bg-blue-600   bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200">
                                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                            </svg>
                                                            <span className="sr-only">Search</span>
                                                        </button>
                                                    </form>
                                                </div>
                                                {
                                                    selectedRole == 'student' ? (
                                                        <>
                                                            <div className="flex flex-col">
                                                                <div className="flex relative ">
                                                                    <input type="text" value={branch} disabled={true} id="branch" className=" rounded-l-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Select a branch"
                                                                        onChange={handleChange}
                                                                        onFocus={handleFocus}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                    <button type="button" onClick={() => setIsBranchOpen(true)} className="p-2.5 ms-2 text-sm font-medium text-white rounded-lg border   focus:ring-4 focus:outline-nonedark:bg-blue-600   bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200">
                                                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                                        </svg>
                                                                        <span className="sr-only">Search</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div className="flex relative ">
                                                                    <input type="text" value={section} disabled={true} id="section" className=" rounded-l-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Select a section"
                                                                        onChange={handleChange}
                                                                        onFocus={handleFocus}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                    <button type="button" onClick={() => setIsSectionOpen(true)} className="p-2.5 ms-2 text-sm font-medium text-white rounded-lg border   focus:ring-4 focus:outline-nonedark:bg-blue-600   bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200">
                                                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                                        </svg>
                                                                        <span className="sr-only">Search</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div className="flex relative ">
                                                                    <input type="text" value={year} disabled={true} id="year" className=" rounded-l-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Select a year"
                                                                        onChange={handleChange}
                                                                        onFocus={handleFocus}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                    <button type="button" onClick={() => setIsYearOpen(true)} className="p-2.5 ms-2 text-sm font-medium text-white rounded-lg border   focus:ring-4 focus:outline-nonedark:bg-blue-600   bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200">
                                                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                                        </svg>
                                                                        <span className="sr-only">Search</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : null
                                                }

                                                <button type="submit" onClick={increment} className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                                    Continue
                                                </button>
                                                <h3 className="mt-6 text-xs  text-center  
                
                text-[12px] items-center font-thin text-gray-100 hover:text-white
                ">
                                                    Already have an account?{" "}
                                                    <Link to={'/login'}>
                                                        <span className="font-semibold text-gray-100 underline">Sign in</span>
                                                    </Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                ) : indexValue == 2 ? (
                                    <div className=" flex flex-col items-center justify-center">
                                        <div className="text-center">
                                            <h1 className="text-2xl font-extrabold text-white">
                                                Student Sign up
                                            </h1>
                                            <h3 className="text-[12px] inline-flex items-center text-xs font-thin text-center text-gray-100 hover:text-white">
                                                Confirm password
                                            </h3>
                                        </div>
                                        <div className="w-full flex-1 mt-8">
                                            <div className="mx-auto max-w-xs flex flex-col gap-4">
                                                <div className="flex flex-col">
                                                    <div className="flex relative ">
                                                        <span className={`
                                rounded-l-md inline-flex  items-center px-3 border-t bg-gray-darker border-l border-b  border-gray-lighter text-gray-500 shadow-sm text-sm ${isPasswordFocused ? 'ring-2 ring-purple-600' : ''}
                                `}>
                                                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                                                </path>
                                                            </svg>
                                                        </span>
                                                        <input type="password" id="password" className={`
                                rounded-r-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your password  ${isPasswordFocused ? 'ring-2 ring-purple-600' : ''}
                                `}
                                                            placeholder="Enter password"
                                                            onChange={handlePasswordChange}
                                                            onFocus={handlePasswordFocus}
                                                            onBlur={handlePasswordBlur}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col mb-6">
                                                    <div className="flex relative ">
                                                        <span className={`
                                rounded-l-md inline-flex  items-center px-3 border-t bg-gray-darker border-l border-b  border-gray-lighter text-gray-500 shadow-sm text-sm ${isReEnterPasswordFocused ? 'ring-2 ring-purple-600' : ''}
                                `}>
                                                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                                                </path>
                                                            </svg>
                                                        </span>
                                                        <input type="password" value={reEnteredpassword} id="reenterpassword" className={`
                                rounded-r-lg flex-1 appearance-none border border-gray-lighter w-full py-2 px-4 bg-gray-darker text-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your password  ${isReEnterPasswordFocused ? 'ring-2 ring-purple-600' : ''}
                                `}
                                                            placeholder="Enter password"
                                                            onChange={handleReEnterPasswordChange}
                                                            onFocus={handleReEnterPasswordFocus}
                                                            onBlur={handleReEnterPasswordBlur}
                                                        />
                                                    </div>
                                                </div>


                                                <button type="submit" onClick={doSignup} className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                                    Sign Up
                                                </button>
                                                <h3 className="mt-6 text-xs  text-center text-[12px] items-center font-thin text-gray-100 hover:text-white">
                                                    Already have an account?{" "}
                                                    <Link to={'/login'}>
                                                        <span className="font-semibold text-gray-100 underline">Sign in</span>
                                                    </Link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                ) : indexValue == 3 ? (
                                    null

                                ) : null
                            }
                            <Drawer open={isOpen} onClose={handleClose} position="right" className='border-4 w-1/3'>
                                <Drawer.Header title="Select a college" />
                                <Drawer.Items>
                                    <form className="flex items-center w-full mx-auto">
                                        <label htmlFor="simple-search" className="sr-only">Search</label>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                                </svg>
                                            </div>
                                            <input type="text" value={searchQuery}
                                                onChange={handleSearch} id="simple-search" className=" border  text-sm rounded-lg  block w-full ps-10 p-2.5 bg-gray-darker border-gray-lighter placeholder-gray-400 text-white " placeholder="Select college name..." required />
                                        </div>
                                        <button type="button" onClick={() => setIsOpen(true)} className="p-2.5 ms-2 text-sm font-medium text-white rounded-lg border   focus:ring-4 focus:outline-nonedark:bg-blue-600   bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200">
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                            <span className="sr-only">Search</span>
                                        </button>
                                    </form>
                                    {
                                        filteredColleges && filteredColleges?.length > 0 && filteredColleges?.map((item, index) => (
                                            <div key={index} className="w-full mt-4 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                <button onClick={() => selectCollege(item?.s_no_, item?.college_name)} type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                    <FaUniversity className='mr-2' />
                                                    {item.college_name}
                                                </button>
                                            </div>
                                        ))
                                    }
                                </Drawer.Items>
                            </Drawer>
                            <Drawer open={isBranchOpen} onClose={handleBranchClose} position="right" className='border-4 w-1/3'>
                                <Drawer.Header title="Select a college" />
                                <Drawer.Items>
                                    {
                                        branchList && branchList?.length > 0 && branchList?.map((item, index) => (
                                            <div key={index} className="w-full mt-4 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                <button onClick={() => selectBranch(item)} type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                    <FaUniversity className='mr-2' />
                                                    {item}
                                                </button>
                                            </div>
                                        ))
                                    }
                                </Drawer.Items>
                            </Drawer>
                            <Drawer open={isSectionOpen} onClose={handleSectionClose} position="right" className='border-4 w-1/3'>
                                <Drawer.Header title="Select a college" />
                                <Drawer.Items>
                                    {
                                        sectionList && sectionList?.length > 0 && sectionList?.map((item, index) => (
                                            <div key={index} className="w-full mt-4 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                <button onClick={() => selectSection(item)} type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                    <FaUniversity className='mr-2' />
                                                    {item}
                                                </button>
                                            </div>
                                        ))
                                    }
                                </Drawer.Items>
                            </Drawer>
                            <Drawer open={isYearOpen} onClose={handleYearClose} position="right" className='border-4 w-1/3'>
                                <Drawer.Header title="Select a college" />
                                <Drawer.Items>
                                    {
                                        yearList && yearList?.length > 0 && yearList?.map((item, index) => (
                                            <div key={index} className="w-full mt-4 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                <button onClick={() => selectYear(item)} type="button" className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                                                    <FaUniversity className='mr-2' />
                                                    {item}
                                                </button>
                                            </div>
                                        ))
                                    }
                                </Drawer.Items>
                            </Drawer>
                        </div>
                    </div>

                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Signup