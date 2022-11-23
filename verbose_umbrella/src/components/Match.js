import {Container, Row, Col} from 'react-bootstrap';
function Match(props) {
    const players = props.players;
    
    let playersDivs = players.map((data, index) => {
        let kdaString = data.kills + "/" + data.deaths + "/" + data.assists;
        return (
            <p key={index}>{data.name + " " + data.champion + " " + kdaString}</p>
        )
    })
    return (
        <Container>
            <Row>
                <Col>
                    <div>                           
                        {playersDivs.slice(0, 5)}
                    </div>
                </Col>
                <Col>
                    <div>
                     {playersDivs.slice(5)}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}


export default Match;