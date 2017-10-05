'use strict';

import React from 'react';

export default class Foo extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.onButtonClick}>Click Me</button>
            </div>
        );
    }
}
