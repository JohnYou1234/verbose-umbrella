import { useEffect, useState } from 'react';
import {Image, Stack} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './dropdown.css';
function Dropdown(props) {
    return (
        <div key={props.matchId} className='dropdown'>
            <hr></hr>
            <div>
                <h3>Team 1</h3>
                <Team team={[10, 12, 13, 5, 9]} />
            </div>
            <div>
                <h3>Team 2</h3>
                <Team team={[3, 14, 14, 12, 16]} />
            </div>
        </div>
    )
}

function Team(props) {
    let team = props.team.map((player, index) => {
        return (
                <Row key={index}> 
                <Col xs='4' md='3'>
                    <Stack direction='horizontal' gap={1}>
                        <Stack direction='horizontal' gap={0}>
                            <Image className='sb-champ' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'} alt={'gp'}/>
                            <Stack gap={0}>
                                <Image className='sb-ss' src={'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/SummonerSnowball.png'} alt={"ssummoner"} />
                                <Image className='sb-ss' src={'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/SummonerFlash.png'} />
                            </Stack>
                        </Stack>
                        
                        <div className="d-flex flex-column">
                            <Image className='sb-rune' src={'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png'} alt='rune' />
                            <Image className='sb-rune' src={'https://ddragon.canisback.com/img/perk-images/Styles/7200_Domination.png'} alt={'mainPlayer.secondary'} />
                        </div>
                        <p>zzzzzzzzzzzzzzzz</p>
                    </Stack>
                </Col>
                <Col><p>{`${8} / ${10} / ${13}`}</p></Col>
                <Col><p>40241</p></Col>
                <Col><p>13.8k</p></Col>
                <Col xs='1'><p>21</p></Col>
                <Col xs='3' className='d-none d-md-flex'>
                    <div className='d-flex flex-row'>
                        <Image className='dd-item-icon' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/3158.png"} alt={"hello"} />
                        <Image className='dd-item-icon' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/3158.png"} alt={"hello"} />
                        <Image className='dd-item-icon' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/3158.png"} alt={"hello"} />
                        <Image className='dd-item-icon' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/3158.png"} alt={"hello"} />
                        <Image className='dd-item-icon' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/3158.png"} alt={"hello"} />
                        <Image className='dd-item-icon' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/3158.png"} alt={"hello"} />
                        <Image className='dd-item-icon' src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/2052.png"} alt={"hello"} />
                    </div>
                </Col>
                </Row>
        )
    })
    return (
        <Container fluid>
            <Row class="text-left">
                <Col xs='4' md='3'>VICTORY</Col>
                <Col>KDA</Col>
                <Col>Damage</Col>
                <Col>Gold</Col>
                <Col xs='1'>CS</Col>
                <Col xs='3' className='d-none d-md-flex'>Items</Col>
            </Row>
            {team}
        </Container>
    )
}
export default Dropdown;
/*
champion summoner spell runes  name kda damage gold cs wards items 
*/