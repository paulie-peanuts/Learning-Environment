import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to login page using useNavigate
    };

    const handleSignUpClick = () => {
        navigate('/signup'); // Navigate to sign up page
    };

    return (
        <nav>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/">Home</Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li style={styles.navItem}>
                            <Link to="/quiz" style={styles.link}>Quiz App</Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/synonym-replacer" style={styles.link}>Synonym Replacer</Link>
                        </li>
                        <li style={styles.navItem}>
                            <button onClick={handleLogout} style={styles.button}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li style={styles.navItem}>
                            <button onClick={handleLoginClick} style={styles.button}>Login</button>
                        </li>
                        <li style={styles.navItem}>
                            <button onClick={handleSignUpClick} style={styles.button}>Sign Up</button>
                        </li>
                    </>
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
        margin: '0',
    },
    navItem: {
        display: 'inline',
        margin: '0 15px',
    },
    button: {
        background: 'none',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
    },
};

export default Navbar;


/*import React from 'react';
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
*/