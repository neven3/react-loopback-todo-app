const registerUrl = 'http://localhost:3001/signup';

async function register(username, email, password) {
    const response = await fetch(registerUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    return data;
}

export default register;