import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', user);
            const userId = response.data.id; // Asegúrate de que este sea el campo correcto donde viene el userId.

            localStorage.setItem('userId', String(userId));
            alert('Login successful');
            window.location.href = '/make-reservation';
        } catch (error) {
            console.error(error);
            alert('Login failed');
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
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
