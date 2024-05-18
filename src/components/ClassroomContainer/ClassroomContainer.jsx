import React from 'react'
import { Card } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom'

const ClassroomContainer = ({ data }) => {
    const navigate = useNavigate()
    const onClassroomClick = (item) => {
        navigate('/classroomoverview', { state: { classroom: item } });
    }

    console.log('@@data', data)
    return (
        <>
            {
                data?.length > 0 ? (
                    data.map((item, index) => (
                        <Card onClick={() => onClassroomClick(item)}
                        key={index} className="max-w-sm bg-gray-lighter m-2 w-1/6 hover:bg-gray-600">
                            <h5 className="text-2xl font-bold tracking-tight text-white">
                                {item.name}
                            </h5>
                            <p className="font-normal text-gray-400">
                                {item?.teacher?.name}
                            </p>
                        </Card>
                    ))
                ) : (
                    <div>
                        <h1>No Classroom</h1>
                    </div>
                )
            }
        </>
    )
}

export default ClassroomContainer