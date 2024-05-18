const baseURL = "https://major-rest-apis.onrender.com/"
import FetchData from "./model";
async function makeRequest(url, method, data) {
    console.log('@@data',data)
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Only include the body if the method is not 'GET'
    if (method !== 'GET') {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error('Failed to make request');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}



// Function to register a teacher
export async function registerTeacher(name, email, password) {
    const url = `${baseURL}register/teacher`;
    const data = { name, email, password };

    try {
        const responseData = await makeRequest(url, 'POST', data);
        console.log('Teacher registered successfully:', responseData);
        return responseData;
    } catch (error) {
        throw error;
    }
}
// export async function createClassroom(input) {
//     const url = `${baseURL}classroom`;
//     const data = input;

//     try {
//         const responseData = await makeRequest(url, 'POST', data);
//         console.log('classroom created:', responseData);
//         return responseData;
//     } catch (error) {
//         throw error;
//     }
// }
export const createClassroom = async (input) => {
    try {
      const result = await FetchData("classroom", input);
      return result;
    } catch (error) {
      console.error('Error fetching data in forms.js:', error);
      throw error;
    }
  };

// Function to login a teacher
export async function loginTeacher(email, password) {
    const url = 'https://major-rest-apis.onrender.com/teacher/login';
    const data = { email, password };

    try {
        const responseData = await makeRequest(url, 'POST', data);
        console.log('Teacher logged in successfully:', responseData);
        return responseData;
    } catch (error) {
        throw error;
    }
}

export async function getClassrooms(teacherid) {
    console.log('@@getclass',teacherid)
    const url = 'https://major-rest-apis.onrender.com/teacher/classrooms';
    const data = { 
        teacherId: teacherid
    };

    try {
        const responseData = await makeRequest(url, 'POST', data);
        console.log('get className:', JSON.stringify(responseData));
        return responseData;
    } catch (error) {
        throw error;
    }
}
