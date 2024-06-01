import React, { useState } from 'react'

import { Button, Checkbox, Label, Modal, TextInput, Avatar, Dropdown, Spinner } from "flowbite-react";
import { createClassroom } from '../../services/api/client';
import { getUserDetails } from '../../services/async-storage';
import { useLogout } from '../../hooks/useLogout';
const Header = () => {
    const [openModal, setOpenModal] = useState(false);
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [subject, setSubject] = useState('');
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
        console.log('@@user', userDetailss)
        if (userDetailss?.type) {
            const input = {
                name: className,
                teacherId: userDetailss.userId,
                studentIds: userDetailss?.studentIds || [],
            }
            const apiResp = await createClassroom(input)
            if (apiResp?.isSuccess) {

                onCloseModal()
            }
            console.log('@@apiResp', apiResp)
        }
    }
    return (
        <header className="z-40 items-center w-full h-16 shadow-lg bg-gray-700 rounded-2xl">
            <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
                    <div className="container relative left-0 z-50 flex w-3/4 h-auto h-full">
                        <div className="relative flex items-center w-full h-full lg:w-64 group">
                            <div className="absolute z-50 flex items-center justify-center block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                                <svg fill="none" className="relative w-5 h-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                                    </path>
                                </svg>
                            </div>
                            <svg className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                                </path>
                            </svg>
                            <input type="text" className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-800 text-gray-400 aa-input" placeholder="Search" />
                            <div className="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-gray-400 border border-gray-300 rounded-2xl md:block cursor-pointer"
                                onClick={() => setOpenModal(true)}
                            >
                                +
                            </div>
                        </div>
                    </div>
                    {/* <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
                        <a href="#" className="relative block">
                            <Avatar placeholderInitials="RR" rounded status="away" statusPosition="bottom-right" />
                        </a>
                    </div> */}
                    <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
                        <Dropdown
                            label={<Avatar alt="User settings"
                                placeholderInitials="RR"
                                status="away"
                                statusPosition="bottom-right"
                                rounded
                            // className='border-2 border-red-500'
                            />}
                            arrowIcon={false}
                            inline
                            className='border-2 border-gray-lighter bg-gray-darker text-white'
                            theme='bg-red-500'
                        >
                            <Dropdown.Header>
                                <span className="block text-sm text-white">Bonnie Green</span>
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
                <Modal show={openModal} className='border-2' size="md" onClose={onCloseModal} popup>
                    <Modal.Header className='bg-gray-darker ' />
                    <Modal.Body className='border-2 bg-gray-darker border-gray-lighter'>
                        <>
                        <div className="space-y-6 ">
                            <h3 className="text-xl font-medium  text-white ">Create a classroom</h3>
                            <div>
                                {/* <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email" />
                                </div> */}
                                <TextInput
                                    id="class name"
                                    placeholder="Class name"
                                    value={className}
                                    onChange={(event) => setClassName(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                {/* <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email" />
                                </div> */}
                                <TextInput
                                    id="section"
                                    placeholder="Section"
                                    value={section}
                                    onChange={(event) => setSection(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                {/* <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email" />
                                </div> */}
                                <TextInput
                                    id="subject"
                                    placeholder="Subject"
                                    value={subject}
                                    onChange={(event) => setSubject(event.target.value)}
                                    required
                                />
                            </div>
                            {/* <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Your password" />
                                </div>
                                <TextInput id="password" type="password" required />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember">Remember me</Label>
                                </div>
                                <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                                    Lost Password?
                                </a>
                            </div> */}
                            <div className="w-full">
                                <Button
                                    onClick={createclass}
                                >Create</Button>
                            </div>
                            {/* <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                                Not registered?&nbsp;
                                <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                                    Create account
                                </a>
                            </div> */}
                        </div>
                        <div>
                            
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