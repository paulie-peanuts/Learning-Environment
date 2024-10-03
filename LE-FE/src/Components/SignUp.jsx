import React, { useState } from 'react';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:5152/api/quiz/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, confirmPassword }),
            });

            if (response.ok) {
                setSuccess("User registered successfully!");
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Registration failed"); // Handle error message
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            console.error('Registration error:', error);
        }
    };

    return (
        <form onSubmit={handleSignUp}>
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
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
            />
            <button type="submit">Sign Up</button>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </form>
    );
};

export default SignUp;
