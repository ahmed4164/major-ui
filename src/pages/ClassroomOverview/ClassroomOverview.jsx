import React from 'react';
import { useLocation } from 'react-router-dom';

const ClassroomOverview = () => {
    const location = useLocation();
    const { classroom } = location.state || {}; // Destructure classroom from location.state

    console.log('@@data', classroom);

    return (
        <div>
            {classroom ? (
                <>
                    <h1>{classroom.name}</h1>
                    <p>{classroom?.teacher?.name}</p>
                    {/* Render other details of the classroom as needed */}
                </>
            ) : (
                <p>No classroom data available</p>
            )}
        </div>
    );
}

export default ClassroomOverview;
