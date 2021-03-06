import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { loginService, getUser } from '../../services';
import './style.css';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [routeTo, setRouteTo] = useState('');

    if (routeTo === 'register') {
        return <Redirect to={`/register`} />
    } else if (routeTo?.userId) {
        return <Redirect to={`/main/${routeTo.userId}`} />
    }

    return (
        <div className="content">
            <div className="container">
                <form className="form">
                    <h2>Login</h2>
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
                            handleLogin(email, password, setRouteTo);
                        }}
                    >
                        Login
                    </button>
                    <p className="sign-up">
                        Don't have an account? <Link to="/register" className="link">Sign up.</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

async function handleLogin(email, password, setRouteTo) {
    try {
        const response = await loginService(email, password);

        if (response?.error?.statusCode >= 400) throw new Error(JSON.stringify(response.error));

        localStorage.setItem('userToken', `Bearer ${response.token}`);

        const userId = await getUserId();

        setRouteTo({ userId });
    } catch (err) {
        // TODO handle login errors
        const error = JSON.parse(err.message);
        alert(error);
    }
}

async function getUserId() {
    try {
        const userId = await getUser();

        return userId;
    } catch (err) {
        // TODO handle not fetching
        const error = JSON.parse(err.message);
        alert(error);
    }
}

export default Login;