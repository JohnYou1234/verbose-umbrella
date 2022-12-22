import {Image, Stack} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './dropdown.css';
function Dropdown(props) {
    const playerData = props.playerData;
    return (
        <div key={props.matchId} className='dropdown'>
            <hr></hr>
            <div>
                <Team team={playerData.allyTeam} parseGold={props.parseGold}/>
            </div>
            <hr></hr>
            <div>
                <Team team={playerData.enemyTeam} parseGold={props.parseGold}/>
            </div>
        </div>
    )
}

function Team(props) {
    let team = props.team;
    const parseGold = props.parseGold;
    let teammates = team.members.map((player, index) => {
        return (
                <Row key={index}> 
                <Col xs='4' md='3'>
                    <Stack direction='horizontal' gap={1}>
                        <Stack direction='horizontal' gap={0}>
                            <Image className='sb-champ' src={player.championIcon} alt={player.champion}/>
                            <Stack gap={0}>
                                <Image className='sb-ss' src={'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/' + player.summoner1 + '.png'} alt={player.summoner1} />
                                <Image className='sb-ss' src={'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/' + player.summoner2 + '.png'} alt={player.summoner2} />
                            </Stack>
                        </Stack>
                        
                        <div className="d-flex flex-column">
                            <Image className='sb-rune' src={player.primaryIcon} alt={player.primary} />
                            <Image className='sb-rune' src={player.secondaryIcon} alt={player.secondary} />
                        </div>
                        <p>{player.name}</p>
                    </Stack>
                </Col>
                <Col><p>{`${player.kills} / ${player.deaths} / ${player.assists}`}</p></Col>
                <Col><p>{player.damage}</p></Col>
                <Col><p>{parseGold(player.goldEarned)}</p></Col>
                <Col xs='1'><p>{player.creepScore}</p></Col>
                <Col xs='1'>{player.visionScore}</Col>
                <Col xs='3' className='d-none d-md-flex'>
                    <div className='d-flex flex-row'>
                        {player.items.map((data, index) => {
                            if (data === 0) return <div key={index} className="item-icon bg"></div>;
                            return <Image key={index} className='item-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/' + data + '.png'} alt={data} />
                        })}
                    </div>
                </Col>
                </Row>
        )
    })
    return (
        <Container>
            <Row className="text-left">
                <Col xs='4' md='3'>{team.victory ? "Victory" : "Defeat"}</Col>
                <Col>KDA</Col>
                <Col>Damage</Col>
                <Col>Gold</Col>
                <Col xs='1'>CS</Col>
                <Col xs='1'>VS</Col>
                <Col xs='3' className='d-none d-md-flex'>Items</Col>
            </Row>
            {teammates}
        </Container>
    )
}
export default Dropdown;
/*
    items = items.map((data, index) => {
        if (data === 0) return <div key={index} className="item-icon bg"></div>;
        return <Image key={index} className='item-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/' + data + '.png'} alt={data} />
    })
*/