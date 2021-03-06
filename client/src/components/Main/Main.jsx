import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getAllTodos } from '../../services';
import { TodoItem, Filter } from '../../components';
import './style.css';

function Main(props) {
    const userId = props.match.params.userId;
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('');
    const [completedCriteria, setCompletedCriteria] = useState('all');

    useEffect(() => {
        getTodos(userId, completedCriteria, setTodos);
    }, [userId, filter, completedCriteria]);

    const filteredTodos = todos.filter(filterTodos(filter, completedCriteria));

    return (
        <React.Fragment>
            <div className="filler"></div>
            <div className="main-content">
                <div className="options">
                    <Filter
                        inputValue={filter}
                        onInputChange={(e) => setFilter(e.target.value)}
                        dropdownValue={completedCriteria}
                        onDropdownChange={(e) => setCompletedCriteria(e.target.value)}
                    />
                    <Link
                        to={`/main/${userId}/add-todo`}
                        className={"reachable-round-btn"}
                    >
                        + Create New
                    </Link>
                </div>
                {filteredTodos.length
                    ? filteredTodos.map(item => {
                        return (
                            <div key={item.id} className="main-container">
                                <TodoItem key={item.id} {...item} />
                            </div>
                        );
                    })
                    : <div className="empty-state">
                        <p>You have no to-dos yet</p>
                    </div>
                }
            </div>
        </React.Fragment>
    );
}

function filterTodos(filter, completedCriteria) {
    return function (item) {
        return (item?.title?.toLowerCase()?.includes(filter) && matchItemWithDropdownVal(item, completedCriteria));
    }
}

function matchItemWithDropdownVal(item, dropdownVal) {
    if (dropdownVal === 'isComplete') {
        return item?.isComplete;
    } else if (dropdownVal === 'isActive') {
        return !item?.isComplete;
    } else {
        return true;
    }
}

async function getTodos(userId, completedCriteria, setTodos) {
    const filter = { where: { userId } };

    if (completedCriteria === 'isComplete') {
        filter.where.isComplete = true;
    } else if (completedCriteria === 'isActive') {
        filter.where.isComplete = false;
    }

    try {
        const todos = await getAllTodos(filter);

        setTodos(todos);
    } catch (err) {
        // TODO handle errors
        alert('There has been an error');
    }
}

export default Main;