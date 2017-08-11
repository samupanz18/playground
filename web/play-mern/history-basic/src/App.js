import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import Page from './Page';

const history = createHistory({
    basename: '/learn-history'
});

class App extends React.Component {
    constructor(props) {
        super(props);

        const {location} = history;

        this.state = {
            location,
        };

        this.unlisten = history.listen((location, action) => {
            this.setState({
                location,
            });
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }
    render() {
        return (
            <div>
                <Menu />    
                {this.renderContent()}            
            </div>
        );
    }
    renderContent() {
        const {pathname} = this.state.location;

        switch (pathname) {
            case '/pageA':
                return <Page name="Page A" />
            case '/pageB':
                return <Page name="Page B" />
            case '/pageC':
                return <Page name="Page C" />
            default:
                return <Page name="Not Found" />
        }
    }
}

const Menu = props => {
    return (
        <ul>
            <li>
                <a href="javascript:void(0);" onClick={showPageA}>Page A</a>
            </li>
            <li>
                <a href="javascript:void(0);" onClick={showPageB}>Page B</a>
            </li>
            <li>
                <a href="javascript:void(0);" onClick={showPageC}>Page C</a>
            </li>
        </ul>        
    );
}

const showPageA = () => {
    history.push('/pageA');
}

const showPageB = () => {
    history.push('/pageB');
}

const showPageC = () => {
    history.push('/pageC');
}

ReactDOM.render(<App />, document.getElementById('app-container'));

