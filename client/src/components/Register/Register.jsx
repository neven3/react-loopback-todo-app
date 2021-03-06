import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { registerService, loginService } from '../../services';
import './style.css';

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [routeTo, setRouteTo] = useState('');

    if (routeTo?.userId) {
        return <Redirect to={`/main/${routeTo.userId}`} />
    }

    return (
        <div className="content">
            <div className="container">
                <form className="form">
                    <h2>Register</h2>
                    <div className="form-control">
                        <label htmlFor="email">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            className="credentials"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            placeholder="Email"
                            className="credentials"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="credentials"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            handleRegister(username, email, password, setRouteTo);
                        }}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

async function handleRegister(username, email, password, setRouteTo) {
    // TODO reject registering users with usernames and/or emails that already exist
    try {
        const response = await registerService(username, email, password);

        if (response?.error?.statusCode >= 400) throw new Error(JSON.stringify(response.error));

        const userId = response.id;

        loginUser(email, password, userId, setRouteTo);
    } catch (err) {
        // TODO handle login errors
        const error = JSON.parse(err.message);
        alert(error);
    }
}

async function loginUser(email, password, userId, setRouteTo) {
    try {
        const response = await loginService(email, password);

        if (response?.error?.statusCode >= 400) throw new Error(JSON.stringify(response.error));

        localStorage.setItem('userToken', `Bearer ${response.token}`);

        setRouteTo({ userId });
    } catch (err) {
        // TODO handle login errors
        const error = JSON.parse(err.message);
        alert(error);
    }
}

export default Register;