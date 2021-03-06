import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { modifyOneTodo, createNewTodo, getOneTodo, deleteOneTodo } from '../../services';
import './style.css';

function EditOrCreateNew(props) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [dateCreated, setDateCreated] = useState(new Date().toLocaleString());
    const [dateUpdated, setDateUpdated] = useState(null);
    const [shouldRoute, setShouldRoute] = useState(false);

    const userId = props.match.params.userId;
    const todoId = props.type === 'edit' && props?.match?.params?.todoId;

    useEffect(() => {
        if (props.type === 'edit') {
            getTodo(todoId, setTitle, setDesc, setIsComplete, setDateCreated, setDateUpdated);
        }
    }, []);

    if (shouldRoute) {
        return <Redirect to={`/main/${userId}`} />
    }

    return (
        <div className="edit-form">
            <div className="filler"></div>
            <div className="form-control-edit">
                <label htmlFor="title">Title</label>
                <input
                    value={title}
                    type="text"
                    id="title"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-control-edit">
                <label htmlFor="desc">Description</label>
                <textarea
                    value={desc}
                    id="desc"
                    placeholder="More details"
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>
            <div className="form-control-edit">
                <label htmlFor="isComplete">Finished</label>
                <span className="isComplete-field">
                    <div><p>Mark task as finished: </p></div>
                    <input
                        checked={isComplete}
                        type="checkbox"
                        id="isComplete"
                        onChange={(e) => setIsComplete(!!e.target.checked)}
                    />
                </span>
            </div>
            <div className="form-control-edit">
                <label htmlFor="dateCreated">Created on</label>
                <input
                    value={new Date(dateCreated).toLocaleString()}
                    type="text"
                    id="dateCreated"
                    disabled
                />
            </div>
            {props.type === 'edit' && dateUpdated &&
                <div className="form-control-edit">
                    <label htmlFor="dateUpdated">Updated on</label>
                    <input
                        value={new Date(dateUpdated).toLocaleString()}
                        type="text"
                        id="dateUpdated"
                        disabled
                    />
                </div>
            }
            <div className="form-control-edit edit-form-btns-container">
                <button
                    className="edit-create-btn save-btn"
                    onClick={props.type === 'edit' ?
                        () => modifyTodo({ setShouldRoute, todoId, title, desc, isComplete })
                        : () => createTodo({ setShouldRoute, title, desc, isComplete, userId })
                    }
                >
                    Save
                </button>
                {props.type === 'edit' &&
                    <button
                        className="edit-create-btn delete-btn"
                        onClick={() => deleteTodo(todoId, setShouldRoute)}
                    >
                        Delete
                    </button>}
            </div>
        </div>
    );
}

async function createTodo({ setShouldRoute, ...body }) {
    try {
        if (body.title === '') throw new Error('Title cannot be empty');

        await createNewTodo(body);
        setShouldRoute(true);
    } catch (err) {
        alert(err);
    }
}

async function modifyTodo({ todoId, setShouldRoute, ...body }) {
    try {
        await modifyOneTodo(todoId, body);
        setShouldRoute(true);
    } catch (err) {
        alert('Error modifying to-do');
    }
}

async function deleteTodo(todoId, setShouldRoute) {
    try {
        await deleteOneTodo(todoId);
        setShouldRoute(true);
    } catch (err) {
        alert('Error deleting to-do');
    }
}

async function getTodo(todoId, setTitle, setDesc, setIsComplete, setDateCreated, setDateUpdated) {
    try {
        const todo = await getOneTodo(todoId);

        setTitle(todo.title);
        setDesc(todo.desc);
        setIsComplete(todo.isComplete);
        setDateCreated(todo.dateCreated);
        setDateUpdated(todo.dateUpdated);
    } catch (err) {
        // TODO handle errors
        alert('Error getting todo');
    }
}

export default EditOrCreateNew;