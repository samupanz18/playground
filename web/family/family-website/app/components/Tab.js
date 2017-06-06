import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class Tab extends Component {
    static propTypes = {
        members: PropTypes.array,
    }
    render() {
        const items = [];
        const {members} = this.props;
        _.each(members, (member) => {
            items.push(
                <li>{member.name}</li>
            );
        });

        return (
            <ul>
                {items}
            </ul>
        );
    }
}
