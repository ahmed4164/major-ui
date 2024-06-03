import React from 'react'
import { Card, Button } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';

const ClassroomContainer = ({ data }) => {
    const navigate = useNavigate();
    
    const onClassroomClick = (item) => {
        navigate('/classroomoverview', { state: { classroom: item } });
    }

    return (
        <div className='py-4 w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
                data?.length > 0 ? (
                    data.map((item, index) => (
                        <Card onClick={() => onClassroomClick(item)}
                            key={index} className="bg-white hover:bg-hovercolor">
                            <h5 className="text-2xl text-headertext font-bold tracking-tight">
                                {item.name}
                            </h5>
                            <p className="font-normal text-gray-400">
                                {item?.teacher?.name}
                            </p>
                            <p className="font-normal text-gray-400">
                                Students: {item.students?.length ?? 0}
                            </p>
                            <Button onClick={() => onClassroomClick(item)} outline gradientDuoTone="greenToBlue">
                                View details
                            </Button>
                        </Card>
                    ))
                ) : (
                    <div>
                        <h1>No Classroom</h1>
                    </div>
                )
            }
        </div>
    );
}

export default ClassroomContainer;
