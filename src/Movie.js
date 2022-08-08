import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

class Movie extends React.Component {
    render() {
        let movieData = this.props.movieData.results.map((movie, index) => {
            let movieCard =
                <ListGroupItem key={index}>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                {movie.title}
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Img src={movie.poster_path} alt={`Poster for ${movie.title}`}/>
                            <Card.Text>
                                {movie.overview}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </ListGroupItem>;
            return movieCard
        });
        let movieDisplay = <ListGroup>{movieData}</ListGroup>

        return (
            <>
            {movieDisplay}
            </>
        );
    }
}

export default Movie;