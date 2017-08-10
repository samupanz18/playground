import React from 'react';

export default class Page extends React.Component {
    render() {
        const {name} = this.props;

        return (
            <div>{`You're at page ${name}`}</div>
        );
    }
}
