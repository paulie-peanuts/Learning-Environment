import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to login page using useNavigate
    };

    return (
        <nav>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <a href="/">Home</a>
                </li>
                {isAuthenticated ? (
                    <li style={styles.navItem}>
                        <button onClick={handleLogout} style={styles.button}>Logout</button>
                    </li>
                ) : (
                    <li style={styles.navItem}>
                        <button onClick={handleLoginClick} style={styles.button}>Login</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

const styles = {
    navList: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#333',
        padding: '10px',
        margin: '0'
    },
    navItem: {
        display: 'inline',
        margin: '0 15px'
    },
    button: {
        background: 'none',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px'
    }
};

export default Navbar;
