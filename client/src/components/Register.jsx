import React, { useState } from 'react';
import { registerUser } from '../api/auth';
import './style/Register.css';

const Register = ({ onRegisterSuccess }) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            setMessage('Registration successful! You can now login.');
            setError('');
            setTimeout(() => {
                if (onRegisterSuccess) onRegisterSuccess();
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Register</h2>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
                <input
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <input
                    className="form-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <button className="btn-submit" type="submit">Register</button>
        </form>
    );
};

export default Register;
