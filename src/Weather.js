import React from 'react';
import './Weather.css'
import { Card, ListGroup } from 'react-bootstrap';


class Weather extends React.Component {

    render() {
        let listItems = this.props.forecast.data.map((val, index) => {
            let forecastDay =
                <ListGroup>
                    <ListGroup.Item style={{ fontSize: "20px" }}>
                        {val.datetime}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Temp: {val.temp}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        High: {val.high_temp}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Low: {val.low_temp}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: {val.weather.description}
                    </ListGroup.Item>
                </ListGroup>
            return <ListGroup.Item style={{ borderStyle: "groove" }} key={index}>{forecastDay}</ListGroup.Item>;
        });
        let forecastList = <ListGroup>{listItems}</ListGroup>;
        return (
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
