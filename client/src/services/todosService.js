const todosUrl = 'http://localhost:3001/todos'

// create new POST
async function createNewTodo(body) {
    const response = await fetch(todosUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('userToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
    });

    const todo = await response.json();

    return todo;
}

export { createNewTodo };

// get all GET
async function getAllTodos(params) {
    const encodedFilter = encodeURIComponent(JSON.stringify(params));

    let url = todosUrl;

    if (params && encodedFilter && encodedFilter !== 'undefined' && encodedFilter !== 'null') {
        url = `${url}?filter=${encodedFilter}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('userToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });

    const todo = await response.json();

    return todo
}

export { getAllTodos };

// get one GET :id
async function getOneTodo(todoId) {
    const url = `${todosUrl}/${todoId}`;

    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('userToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });

    if (response?.error?.statusCode >= 400) throw new Error(JSON.stringify(response.error));

    const todo = await response.json();

    return todo
}

export { getOneTodo };

// modify one PATCH :id
async function modifyOneTodo(todoId, body) {
    const url = `${todosUrl}/${todoId}`;

    const bodyWithUpdateDate = {
        ...body,
        dateUpdated: new Date()
    };

    await fetch(url, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('userToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(bodyWithUpdateDate)
    });
}

export { modifyOneTodo };

// replace one PUT :id

// delete one DELETE
async function deleteOneTodo(todoId,) {
    const url = `${todosUrl}/${todoId}`;

    const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('userToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });

    if (response?.error?.statusCode >= 400) throw new Error(JSON.stringify(response.error));
}

export { deleteOneTodo };