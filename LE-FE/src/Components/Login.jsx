import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory in v6

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook to handle navigation after successful login

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {
            const response = await fetch('http://localhost:5152/api/quiz/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Store the token in local storage
                onLoginSuccess(data.token); // Call the login success handler from props
                navigate('/protected'); // Redirect to the protected route after login
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Login;



/*import React, { useState } from 'react';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {
            const response = await fetch('http://localhost:5152/api/quiz/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Store the token in local storage
                setIsAuthenticated(true); // Trigger re-render by updating state
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed");
            }

        } catch (error) {
            setError("An error occurred. Please try again.");
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;*/
