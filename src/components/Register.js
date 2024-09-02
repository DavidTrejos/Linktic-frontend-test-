import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [user, setUser] = useState({ username: '', password: '', role: '' });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/users/register', user);
            alert('User registered successfully');
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Username"
            />
            <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
            />
            <input
                type="text"
                name="role"
                value={user.role}
                onChange={handleChange}
                placeholder="Role"
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
