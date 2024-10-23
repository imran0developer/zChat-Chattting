// File: src/Auth.js
import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../constants';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const apiUrl = isLogin ? '/api/auth/login' : '/api/auth/register';
        const userData = isLogin 
            ? { email, password }
            : { username, email, password };

        try {
            const response = await axios.post(`${baseUrl}${apiUrl}`, userData);

            // Store the JWT token in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userid', response.data.user.id);
            localStorage.setItem('username', response.data.user.username);

            console.log('Logged in/Registered successfully:', response.data);

            navigate('/chat')

        } catch (err) {
            setError(err.response.data.message || 'Authentication failed');
        }
    };

    // Toggle between Login and Register
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            
            {error && <p className="error-message">{error}</p>}
            
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>

            <button onClick={toggleForm}>
                {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default Auth;
