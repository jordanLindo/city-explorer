import React from 'react';
import './Weather.css'
import { Card, ListGroup } from 'react-bootstrap';


class Weather extends React.Component{
    
    render(){
        let listItems = this.props.forecast.map((val,index) => {
            return <ListGroup.Item key={index}>{val}</ListGroup.Item>;
        });
        let forecastList = <ListGroup variant="flush">{listItems}</ListGroup>;
        return(
            <Card>
                <Card.Header>Forecast</Card.Header>
                <Card.Body>
                    {forecastList}
                </Card.Body>
            </Card>
        )
    }
}

export default Weather;