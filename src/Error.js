import React from "react";
import Card from 'react-bootstrap/Card';
import './Error.css';

class Error extends React.Component {

    render() {
        return (
            <Card style={{borderRadius: '30px'}} className="Error">
                <h3>
                    {this.props.errorMessage}
                </h3>
            </Card>
        )
    }
}

export default Error;
