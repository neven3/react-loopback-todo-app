import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function TodoItem(props) {
    const { title, id, dateCreated, dateUpdated, isComplete, userId } = props;

    return (
        <Link to={`/main/${userId}/todo/${id}`}>
            <div className="todo-item">
                <h4>{title}</h4>
                {dateUpdated
                    ? <span className="date">Updated on {new Date(dateUpdated).toLocaleString()}</span>
                    : <span className="date">Created on {new Date(dateCreated).toLocaleString()}</span>
                }
                <span className={isComplete ? "completed" : "active"}>{isComplete ? "Finished" : "Active"}</span>
            </div>
        </Link>
    );
}

export default TodoItem;