// import { saveAs } from 'file-saver'

export const saveToken = (token) => {
    localStorage.setItem('token', token);
};
export const saveUserDetails = (details) => {
    localStorage.setItem('userDetails', details);
};

export const getToken = () => {
    return localStorage.getItem('token');
};
export const getUserDetails = () => {
    const userDetailsString = localStorage.getItem('user');
    return userDetailsString ? JSON.parse(userDetailsString) : null;
};
