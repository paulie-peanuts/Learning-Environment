import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <nav>
      <ul className="navbar-menu">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link to="/quiz" className="nav-link">Quiz App</Link>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link">Books</span>
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link to="/book-summary" className="nav-link">Book Summary</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/book-search" className="nav-link">Book Search</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/synonym-replacer" className="nav-link">Synonym Replacer</Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-button">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <button onClick={handleLoginClick} className="nav-button">Login</button>
            </li>
            <li className="nav-item">
              <button onClick={handleSignUpClick} className="nav-button">Sign Up</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;



/*import React from 'react';
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
                            <Link to="/book-summary" style={styles.link}>Book Summary</Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/book-search" style={styles.link}>Book Search</Link>
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

export default Navbar;*/


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