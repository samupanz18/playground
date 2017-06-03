import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class Tab extends Component {
    static propTypes = {
        starProfiles: PropTypes.array,
    }
    render() {
        const items = [];
        const {starProfiles} = this.props;
        _.each(starProfiles, (starProfile) => {
            items.push(
                <li>{starProfile.name}</li>
            );
        });

        return (
            <ul>
                {items}
            </ul>
        );
    }
}
