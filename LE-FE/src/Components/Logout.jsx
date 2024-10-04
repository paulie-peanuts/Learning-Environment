import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ handleLogout }) => {
    const navigate = useNavigate();

    const onLogoutClick = () => {
        handleLogout(); // Call the function to remove the token and update state
        navigate('/login'); // Navigate back to the login page
    };

    return (
        <button onClick={onLogoutClick}>
            Logout
        </button>
    );
};

export default Logout;
