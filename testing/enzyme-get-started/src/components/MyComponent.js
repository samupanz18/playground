'use strict';

import React from 'react';
import Foo from './Foo';

export default class MyComponent extends React.Component {
    render() {
        return (
            <div className="icon-star">
                <div>
                    <Foo key="foo1" />
                    <Foo key="foo2" />
                    <Foo key="foo3" />
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
