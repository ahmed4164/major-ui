import React, { useEffect, useState } from 'react'
import { Card } from "flowbite-react";
import { Sidebar, Header, ClassroomContainer, Loader, useLoader } from '../../components'
import { Button, Checkbox, Label, Modal, TextInput, Avatar, Dropdown, Spinner } from "flowbite-react";
import { getClassrooms } from '../../services/api/client'
import { getUserDetails } from '../../services/async-storage';
import { BsBuildingFillAdd } from "react-icons/bs";
import { ButtonPrimary } from '../../components';
import { createClassroom, getStudents } from '../../services/api/client';
import avatarEmpty from '../../assets/avatar-empty.png';

import { connect } from 'react-redux';
import { fetchClassrooms } from '../../actions/classroomActions';

// import { setUserDetails } from '../../actions/userActions';
const Dashboard = ({ classrooms, error, fetchClassrooms }) => {
    const [classRoomData, setClassRoomData] = useState()
    const [userDetails, setUserDetails] = useState()
    const { isLoading, showLoader, dismissLoader } = useLoader();

    const [openModal, setOpenModal] = useState(false);
    const [className, setClassName] = useState('');
    const [section, setSection] = useState('');
    const [subject, setSubject] = useState('');
    const [studentsids, setStudentsids] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
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
            title: "text-2xl font-medium text-gray-900 text-red pl-2",
            close: {
                base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
                // icon: "h-5 w-5",
            },
        },
        // footer: {
        //     base: "flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600 bg-red-400",
        //     popup: "border-t",
        // },
    };
    // useEffect(() => {
    //     const userDetailss = getUserDetails()
    //     console.log('@@userDetails', userDetailss)
    //     setUserDetails(userDetailss)
    //     const fetchData = async () => {
    //         try {
    //             if (userDetailss) {
    //                 const apiResponse = await getClassrooms(userDetailss.userId);
    //                 console.log('@@message', apiResponse)
    //                 if (apiResponse.isSuccess) {
    //                     setClassRoomData(apiResponse?.classrooms)
    //                 }
    //             }
    //             // alert(message); // Display success message
    //         } catch (error) {
    //             console.log('@@error', error)
    //             // alert(error.message); // Display error message
    //         }
    //     }
    //     fetchData()
    // }, [])
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
    const onCloseModal = async () => {
        console.log('@@calles')
        setOpenModal(false);
        setClassName('');
        setSection('');
        setSubject('');
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
            if (apiResp?.classroom?.createdAt) {
                // onCloseModal()
                setOpenModal(false);
                setClassName('');
                setSection('');
                setSubject('');
            }
            if (userDetails && userDetails.userId) {
                fetchClassrooms(userDetails.userId);
            }
        }
    }
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const fetchUserAndClassrooms = async () => {
            showLoader();
            const userDetails = await getUserDetails();
            setUserDetails(userDetails)
            if (userDetails && userDetails.userId) {
                const respData = await getStudents(userDetails.userId)
                setStudentsList(respData)
            }
            if (userDetails && userDetails.userId) {
                setUserId(userDetails.userId);
                fetchClassrooms(userDetails.userId);
            }
            dismissLoader();
        };

        fetchUserAndClassrooms();
    }, [fetchClassrooms]);
    // console.log('@@userDetails', userDetails?.type)
    useEffect(() => {
        setClassRoomData(classrooms)
        dismissLoader();
    }, [classrooms])
    if (error) {
        dismissLoader();
        return <p>Error: {error}</p>;
    }
    return (
        <main className="relative h-screen bg-bggray flex">
            <div className={`fixed top-0 left-0 h-full z-10`}>
                <Sidebar isVisible={isSidebarVisible} />
            </div>
            <div className="flex flex-col w-full">
                <div className="fixed top-0 left-0 w-full z-40">
                    <Header toggleSidebar={toggleSidebar} isVisible={isSidebarVisible} />
                </div>
                <div className="mt-16 lg:ml-14 p-6 flex-1 overflow-y-auto">
                    <div className="flex w-full justify-between items-center align-middle">
                        <div>
                            <h2 className='text-lg font-bold tracking-wide'>Dashboard</h2>
                        </div>
                        <div>
                            <ButtonPrimary onClick={() => setOpenModal(true)} type="button">
                                Create Classroom
                            </ButtonPrimary>
                        </div>
                    </div>
                    <div className="py-2">
                        <div className="flex w-full justify-between items-center">
                            <div>
                                <h2 className='text-lg font-bold tracking-wide'>Your Classrooms</h2>
                            </div>
                            <div>
                                <button className='text-sm font-medium underline'>View all</button>
                            </div>
                        </div>
                        {
                            classRoomData?.length > 0 ? (
                                <div className="flex flex-row flex-wrap sm:flex-row">
                                    <ClassroomContainer data={classRoomData} />
                                </div>
                            ) : (
                                <div className='flex justify-center items-center h-full'>
                                    <div className='flex justify-center items-center flex-col'>
                                        <div className='mb-3'>
                                            <BsBuildingFillAdd style={{ color: 'white' }} size={82} />
                                        </div>
                                        <div>
                                            <ButtonPrimary onClick={() => console.log('add')} type="button">
                                                {
                                                    userDetails?.type === 'teacher' ? "Add classroom" : "join classroom"
                                                }
                                            </ButtonPrimary>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Modal theme={customModalTheme} show={openModal} onClose={onCloseModal} popup>
                <Modal.Header className={customModalTheme.header.base} >
                    <span className={customModalTheme.header.title}>Create a classroom</span>
                </Modal.Header>
                <Modal.Body theme={customModalTheme.content.base} className=' flex justify-between w-full'>
                    <>
                        <div className="space-y-6 pr-8  border-r-2 w-1/2">
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
                                    className='m-0'
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
                        <div className="scrollable-container overflow-scroll">
                            {studentsList && studentsList.length > 0 && studentsList.map((item, index) => (
                                <div key={index} className="space-y-2 p-2">
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
                {/* <Modal.Footer theme={customModalTheme.footer.popup}>

                    </Modal.Footer> */}
            </Modal>
        </main>
    )
}

const mapStateToProps = (state) => ({
    classrooms: state.classroom.classrooms,
    error: state.classroom.error,
});

const mapDispatchToProps = (dispatch) => ({
    fetchClassrooms: (userId) => dispatch(fetchClassrooms(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);