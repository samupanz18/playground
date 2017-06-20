import React from 'react';
import PropTypes from 'prop-types';
import RemoveTodo from '../containers/RemoveTodo';

const Todo = ({onClick, id, completed, text}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none',
        }}
    >
        {text}
        <RemoveTodo id={id}/>
    </li>
);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};

export default Todo;
