import React, {Component} from 'react';
import Tab from './Tab';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
        };
    }
    componentWillMount() {
        fetch('http://127.0.0.1:3000/listMembers', {
            method: 'GET',
        }).then((response) => {
            return response.json();
        }).then((members) => {
            this.setState({
                members,
            });
        }).catch((error) => {
            console.log(error.message);
        });
    }
    render() {
        const {members} = this.state;

        return (
            <div>
                <Tab members={members}/>
            </div>
        );
    }
}
