import React from 'react';
import './style.css';

function Filter(props) {
    return (
        <React.Fragment>
            <div className="search">
                <div className="form-control-search">
                    <label htmlFor="title-filter">Search by title</label>
                    <input
                        type="text"
                        id="title-filter"
                        placeholder="e.g. Visit grandma"
                        value={props.inputValue}
                        onChange={props.onInputChange}
                    />
                    <label htmlFor="select">Search by status</label>
                    <select
                        value={props.dropdownValue}
                        onChange={props.onDropdownChange}
                        id="select"
                    >
                        <option value="all">All</option>
                        <option value="isComplete">Completed</option>
                        <option value="isActive">Active</option>
                    </select>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Filter;