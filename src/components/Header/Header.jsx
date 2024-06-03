import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Label, Modal, TextInput, Avatar, Dropdown, Spinner } from "flowbite-react";
import { createClassroom, getStudents } from '../../services/api/client';
import { getUserDetails } from '../../services/async-storage';
import { useLogout } from '../../hooks/useLogout';
import avatarEmpty from '../../assets/avatar-empty.png';
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
const Header = ({ toggleSidebar, isVisible }) => {
    const [openModal, setOpenModal] = useState(false);
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [subject, setSubject] = useState('');
    const [userDetail, setUserDetails] = useState('');
    const [studentsids, setStudentsids] = useState([]);
    // Define the custom theme for the Button
    const customModalTheme = {
        root: {
            base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            show: {
                on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
                // off: "hidden",
            },
            sizes: {
                sm: "max-w-sm",
                md: "max-w-md",
                lg: "max-w-lg",
                xl: "max-w-xl",
                // "2xl": "max-w-2xl",
                // "3xl": "max-w-3xl",
                // "4xl": "max-w-4xl",
                // "5xl": "max-w-5xl",
                // "6xl": "max-w-6xl",
                // "7xl": "max-w-7xl",
            },
            positions: {
                // "top-left": "items-start justify-start",
                // "top-center": "items-start justify-center",
                // "top-right": "items-start justify-end",
                // "center-left": "items-center justify-start",
                center: "items-center justify-center",
                // "center-right": "items-center justify-end",
                // "bottom-right": "items-end justify-end",
                // "bottom-center": "items-end justify-center",
                // "bottom-left": "items-end justify-start",
            },
        },
        content: {
            base: "relative h-full w-full p-4 md:h-auto",
            inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
        },
        body: {
            base: "border-10 h-96 overflow-auto p-6",
            popup: "pt-0",
        },
        header: {
            base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
            popup: "border-b-0 p-2",
            title: "text-2xl font-medium text-gray-900 text-red",
            close: {
                base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
                // icon: "h-5 w-5",
            },
        },
        footer: {
            base: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600",
            popup: "border-t",
        },
    };
    const addStudent = (item) => {
        const id = item?._id;
        const updatedIds = [...studentsids];
        const index = updatedIds.indexOf(id);

        if (index === -1) {
            updatedIds.push(id);
        } else {
            updatedIds.splice(index, 1);
        }
        setStudentsids(updatedIds);
    };
    const [studentsList, setStudentsList] = useState([]
    );
    const { logout } = useLogout()
    const onCloseModal = () => {
        console.log('@@calles')
        setOpenModal(false);
        setClassName('');
        setSection('');
        setSubject('');
    }
    const handleLogout = () => {
        logout()
    }
    const createclass = async () => {
        const userDetailss = getUserDetails()
        if (userDetailss?.type) {
            const input = {
                name: className,
                teacherId: userDetailss.userId,
                studentIds: studentsids,
            }
            const apiResp = await createClassroom(input)
            if (apiResp?.isSuccess) {

                onCloseModal()
            }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const userDetails = await getUserDetails();
            setUserDetails(userDetails)
            if (userDetails && userDetails.userId) {
                const respData = await getStudents(userDetails.userId)
                setStudentsList(respData)
            }
        }
        fetchData()
    }, []);
    return (
        <header className="items-center w-full h-16 shadow-lg bg-bggray ">
            <div className="z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                <div className=" flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 justify-between">
                    <div onClick={toggleSidebar} className='h-full w-10 justify-center items-center flex lg:hidden '>
                        {
                            isVisible ? <MdOutlineClose /> : <RxHamburgerMenu />
                        }
                    </div>
                    <div className=" hidden lg:block container  left-0 z-50 flex w-3/4 h-auto h-full">
                        <div className=" flex items-center w-full h-full lg:w-64 group">
                            <div className=" absolute z-50 flex items-center justify-center lg:block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                                {/* <svg fill="none" className=" w-5 h-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                                    </path>
                                </svg> */}
                            </div>
                            {/* <svg className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                                </path>
                            </svg>
                            <input type="text" className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-800 text-gray-400 aa-input" placeholder="Search" />
                            <div className="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-gray-400 border border-gray-300 rounded-2xl md:block cursor-pointer"
                                onClick={() => setOpenModal(true)}
                            >
                                +
                            </div> */}
                        </div>
                    </div>
                    {/* <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
                        <a href="#" className="relative block">
                            <Avatar placeholderInitials="RR" rounded status="away" statusPosition="bottom-right" />
                        </a>
                    </div> */}
                    <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
                        <Dropdown
                            //      <div className="rounded-full w-10 h-10 overflow-hidden">
                            //      <img src={avatarEmpty} alt="" />
                            //  </div>
                            label={<Avatar
                                alt="User settings"
                                placeholderInitials="RR"
                                status="away"
                                img={avatarEmpty}
                                statusPosition="bottom-right"
                                rounded
                                className='border rounded-full border-gray-400'
                            />}

                            arrowIcon={false}
                            inline
                            className='border-2 border-gray-lighter bg-gray-darker text-white'
                            theme='bg-red-500'
                        >
                            <Dropdown.Header>
                                <span className="block text-sm text-white">{userDetail.name}</span>
                                <span className="block truncate text-sm font-medium text-white">name@flowbite.com</span>
                            </Dropdown.Header>
                            <Dropdown.Item className="text-sm text-white hover:bg-gray-700 focus:bg-gray-700">Dashboard</Dropdown.Item>
                            <Dropdown.Item className="text-sm text-white hover:bg-gray-700 focus:bg-gray-700">Settings</Dropdown.Item>
                            <Dropdown.Item className="text-sm text-white hover:bg-gray-700 focus:bg-gray-700">Earnings</Dropdown.Item>
                            <Dropdown.Divider className='bg-red-500' />
                            <Dropdown.Item onClick={handleLogout} className="text-sm text-white hover:bg-gray-700 focus:bg-gray-700 my-0">Sign out</Dropdown.Item>
                        </Dropdown>
                        {/* <Spinner color="purple" aria-label="Purple spinner example" /> */}

                    </div>
                </div>
                <Modal theme={customModalTheme} show={openModal} onClose={onCloseModal} popup>
                    <Modal.Header>
                        <span className={customModalTheme.header.title}>Create a classroom</span>
                    </Modal.Header>
                    <Modal.Body theme={customModalTheme.content.base} className='border-2 border-red-500 flex justify-between w-full'>
                        <>
                            <div className="space-y-6 border-2 w-1/2">
                                {/* <h3 className="text-xl font-medium  text-gray-darker ">Create a classroom</h3> */}
                                <div>
                                    <div className="block">
                                        <Label htmlFor="email" value="Enter class name" />
                                    </div>
                                    <TextInput
                                        id="classname"
                                        placeholder="Class name"
                                        value={className}
                                        onChange={(event) => setClassName(event.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="email" value="Enter section" />
                                    </div>
                                    <TextInput
                                        id="section"
                                        placeholder="Section"
                                        value={section}
                                        onChange={(event) => setSection(event.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="block">
                                        <Label htmlFor="email" value="Enter subject" />
                                    </div>
                                    <TextInput
                                        id="subject"
                                        placeholder="Subject"
                                        value={subject}
                                        className='border-2 m-0'
                                        onChange={(event) => setSubject(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <Button
                                        onClick={createclass}
                                    >Create</Button>
                                </div>
                            </div>
                            <div className="border-2 border-red-500 scrollable-container overflow-scroll">
                                {studentsList && studentsList.length > 0 && studentsList.map((item, index) => (
                                    <div key={index} className="space-y-2 border-2 p-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-full w-10 h-10 overflow-hidden">
                                                    <img src={avatarEmpty} alt="" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{item.name}</div>
                                                    <div className="text-gray-500 dark:text-gray-400 text-sm">{item.email}</div>
                                                </div>
                                            </div>
                                            <Checkbox onClick={() => addStudent(item)} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </>
                    </Modal.Body>
                </Modal>

            </div>
            {/* <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal> */}
        </header>
    )
}

export default Header