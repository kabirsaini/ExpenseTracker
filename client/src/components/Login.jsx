import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import './style/Login.css';

const Login = ({ setIsAuthenticated, onLoginSuccess }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            localStorage.setItem('token', res.data.token);
            setIsAuthenticated(true);
            onLoginSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <>
            <div className="typing-container">
                <div className="typing-line line1">Welcome to Expense Tracker</div>
                <div className="typing-line line2">Let's start with logging in</div>
            </div>



            <div className="form-cont">
                <div className="form-items">

                    <form className="form" onSubmit={handleSubmit}>
                        <p>Expense Tracker</p>
                        <h2>Login to Your Account</h2>

                        {error && <p className="error-message">{error}</p>}

                        <input
                            className="form-input"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />

                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />

                        <button className="btn-submit" type="submit">Login</button>
                    </form>

                    <div className="image-side">
                        <img src="/image/login.avif" alt="Login Illustration" />
                    </div>

                </div>
            </div>
        </>

            );
};

export default Login;
