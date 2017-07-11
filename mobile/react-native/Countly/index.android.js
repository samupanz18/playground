/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import {Provider, connect} from 'react-redux';
import {increment, decrement, zero} from './src/actions';
import store from './src/store';
import Counter from './src/Counter';

const mapStateToProps = state => ({
    count: state.count,
});
const mapDispatchToProps = dispatch => ({
    increment: () => {dispatch(increment())},
    decrement: () => {dispatch(decrement())},
    zero: () => {dispatch(zero())},
});
const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default class Countly extends Component {
    render() {
        return (
            <Provider store={store}>
                <CounterContainer />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Countly', () => Countly);
