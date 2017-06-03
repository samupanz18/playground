import React, {Component} from 'react';
import Tab from './Tab';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            starProfiles: [],
        };
    }
    componentWillMount() {
        fetch('http://127.0.0.1:3000/list', {
            method: 'GET',
            // mode: 'no-cors',
        }).then((response) => {
            return response.json();
        }).then((starProfiles) => {
            this.setState({
                starProfiles,
            });
        }).catch((error) => {
            console.log(error.message);
        });
    }
    render() {
        const {starProfiles} = this.state;

        return (
            <div>
                <Tab starProfiles={starProfiles}/>
            </div>
        );
    }
}
