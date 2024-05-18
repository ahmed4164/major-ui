import React, { useEffect, useState } from 'react'
import { Sidebar, Header, ClassroomContainer } from '../../components'
import { getClassrooms } from '../../services/api/client'
import { getUserDetails } from '../../services/async-storage';
import { BsBuildingFillAdd } from "react-icons/bs";
import { ButtonPrimary } from '../../components';

import { connect } from 'react-redux';
import { fetchClassrooms } from '../../actions/classroomActions';
// import { setUserDetails } from '../../actions/userActions';
const Dashboard = ({ classrooms, error, fetchClassrooms }) => {
    const [classRoomData, setClassRoomData] = useState()
    const [userDetails, setUserDetails] = useState()
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
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const fetchUserAndClassrooms = async () => {
            const userDetails = await getUserDetails();
            setUserDetails(userDetails)
            console.log('@@userDetails',userDetails)
            if (userDetails && userDetails.userId) {
                setUserId(userDetails.userId);
                fetchClassrooms(userDetails.userId);
            }
        };

        fetchUserAndClassrooms();
    }, [fetchClassrooms]);
    // console.log('@@classroomdata', classRoomData)
    // console.log('@@userDetails', userDetails?.type)
    useEffect(()=>{
        setClassRoomData(classrooms)
    },[classrooms])
    if (error) {
        return <p>Error: {error}</p>;
      }
      console.log('@@classrooms',classrooms)
    return (
        <main className="relative h-screen overflow-hidden bg-gray-darker  scroll">
            <div className="flex items-start justify-between">
                <div className="z-50">
                    <Sidebar />
                </div>
                <div className=" flex flex-col w-full pl-0 md:p-4 md:space-y-4">
                    <Header />
                    <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0">
                        {
                            classRoomData?.length > 0 ? (
                                <div className="flex flex-row flex-wrap sm:flex-row">
                                    <ClassroomContainer data={classRoomData} />
                                </div>
                            ) : (
                                <div className='flex justify-center items-center h-full'>
                                    <>
                                        <div className='flex justify-center items-center flex-col'>
                                            <div className='mb-3'>
                                                {/* <h1 className='text text-white font-extrabold text-3xl'>No Classroom</h1> */}
                                                <BsBuildingFillAdd style={{ color: 'white' }} size={82} />
                                            </div>
                                            <div>
                                                <ButtonPrimary onClick={() => console.log('add')} type="button">
                                                    {
                                                        userDetails?.type == 'teacher' ?  "Add classroom": "join classroom"
                                                    }

                                                </ButtonPrimary>

                                            </div>
                                        </div>
                                    </>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
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