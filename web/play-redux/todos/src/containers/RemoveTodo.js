import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {removeTodo} from '../actions';

let RemoveTodo = ({onClick}) => {
    return (
        <span onClick={onClick} style={{color: 'red'}}>X</span>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            const {id} = ownProps;

            dispatch(removeTodo(id));
        },
    };
};

RemoveTodo = connect(null, mapDispatchToProps)(RemoveTodo);

RemoveTodo.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default RemoveTodo;
