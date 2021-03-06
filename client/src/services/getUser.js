const getUserUrl = 'http://localhost:3001/whoAmI';

async function getUser() {
    const response = await fetch(getUserUrl, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('userToken'),
            'Accept': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });

    const userDetails = await response.text();
    return userDetails;
}

export default getUser;