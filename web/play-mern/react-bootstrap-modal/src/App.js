import React from 'react';
import ReactDOM from 'react-dom';
import {
    Grid,
    Row,
    Col,
    Button,
    Modal,
} from 'react-bootstrap';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        };

        this.close = ::this.close;
        this.open = ::this.open;
    }
    close() {
        this.setState({
            showModal: false,
        });
    }
    open() {
        this.setState({
            showModal: true,
        })
    };
    render() {
        return (
            <Grid>
                <Row>
                    <Col>    
                        <h2>Learn react-bootsrap modal</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button 
                            bsStyle="success" 
                            bsSize="small"
                            onClick={this.open}
                        >
                            Open Modal
                        </Button>
                        <Modal
                            show={this.state.showModal}
                            onHide={this.close}
                            container={this}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Modal body #1
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.close}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app-container'));
