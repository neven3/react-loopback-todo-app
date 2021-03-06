const loginUrl = 'http://localhost:3001/users/login';

async function login(email, password) {
    const response = await fetch(loginUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ email, password })
    });

    if (response?.error?.statusCode >= 400) throw new Error(JSON.stringify(response.error));

    const token = await response.json();

    return token;
}

export default login;