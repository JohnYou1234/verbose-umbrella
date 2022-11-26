import {Container, Row, Col, Stack} from 'react-bootstrap';
function Match(props) {
    const gameData = props.gameData;
    let mainPlayer = gameData.playerData.mainPlayer;
    let gameInfo = gameData.gameInfo;
    return (
        <Container>
            <Row>
                <Col>
                    <Stack>                           
                        <p>{mainPlayer.victory ? "Victory" : "Defeat"}</p>
                        <p>{gameInfo.matchId}</p>
                        <p>{gameInfo.gameTimer}</p>
                        <p>{gameInfo.gameMode}</p>
                    </Stack>
                </Col>
                <Col>
                    <Stack>
                        <p>{mainPlayer.kills + "/" + mainPlayer.deaths + "/" + mainPlayer.assists}</p>
                        <p>{mainPlayer.champion}</p>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}


export default Match;