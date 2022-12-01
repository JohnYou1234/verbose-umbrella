import {Container, Row, Col, Stack, Image} from 'react-bootstrap';
function Match(props) {
    // const gameData = props.gameData;
    // let mainPlayer = gameData.playerData.mainPlayer;
    // let gameInfo = gameData.gameInfo;
    // let gameTimer = parseGameTime(gameInfo.gameTimer);
    // let gameStatus = mainPlayer.victory ? "victory" : "defeat";
    return (
        <Stack gap={3} className={"match victory justify-content-center"} direction="horizontal">
            <div>
                <Stack gap={1}>
                    <div>Victory</div>       
                    <div>ARAM</div>               
                    <div>21:22</div>
                    <div>11/29/2022</div>
                </Stack>
            </div>
            <div>
                <Stack>
                <Image className='player-champ' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'} alt='gangplank' />
                <Stack direction="horizontal" gap={0}>
                    <Image className='ss-icon' src={'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/SummonerDot.png'} alt='gangplank' />
                    <Image className='ss-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/SummonerFlash.png'} alt='flash summoner spell' />
                </Stack>
                </Stack>
            </div>
            <div>
                <Stack>
                    <Image className='rune-icon ss-icon' src={'https://ddragon.canisback.com/img/perk-images/Styles/Domination/Electrocute/Electrocute.png'} alt='rune' />
                    <Image className='rune-icon ss-icon' src={' https://ddragon.canisback.com/img/perk-images/Styles/7202_Sorcery.png'} alt='gangplank' />
                </Stack>
            </div>
            <div>
                <Stack gap="1" >
                    <div>21/7/3</div>
                    <div>322 CS</div>
                </Stack>
            </div>
            <div>
                <Stack gap={1} direction='horizontal'>
                    <Stack gap={1}>
                        <Image className='item-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/1001.png'} alt='gangplank' />
                        <Image className='item-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/1001.png'} alt='gangplank' />
                    </Stack>
                    <Stack gap={1}>
                        <Image className='item-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/1001.png'} alt='gangplank' />
                        <Image className='item-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/1001.png'} alt='gangplank' />
                    </Stack>
                    <Stack gap={1}>
                        <Image className='item-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/1001.png'} alt='gangplank' />
                        <Image className='item-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/1001.png'} alt='gangplank' />
                    </Stack>
                </Stack>
            </div>

            <div>
                <Stack gap={1} className="ally-team">
                    <Stack direction='horizontal' gap={1}>
                        <Image className='ally-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'} alt='gangplank' />
                        Summoner 1
                    </Stack>
                    <Stack direction='horizontal' gap={1}>
                        <Image className='ally-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Elise.png'} alt='elise' />
                        Summoner 2
                    </Stack>
                    <Stack direction='horizontal' gap={1}>  
                        <Image className='ally-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Annie.png'} alt='annie' />
                        Summoner 3
                    </Stack>
                    <Stack direction='horizontal' gap={1}>
                        <Image className='ally-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Ezreal.png'} alt='ezreal' />
                        Summoner 4
                    </Stack>
                    <Stack direction='horizontal' gap={1}>
                        <Image className='ally-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Thresh.png'} alt='thresh' />
                        Summoner 5
                    </Stack>
                </Stack>
            </div>

            <div>
                <Stack gap={1} className="enemy-team">
                    <Stack direction='horizontal' gap={1}>
                        <Image className='ally-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Aatrox.png'} alt='gangplank' />
                        Summoner 1
                    </Stack>
                    <Stack direction='horizontal' gap={1}>
                        <Image className='ally-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Ekko.png'} alt='elise' />
                        Summoner 2
                    </Stack>
                    <Stack direction='horizontal' gap={1}>  
                        <Image className='ally-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Zilean.png'} alt='annie' />
                        Summoner 3
                    </Stack>
                    <Stack direction='horizontal' gap={1}>
                        <Image className='ally-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Vayne.png'} alt='ezreal' />
                        Summoner 4
                    </Stack>
                    <Stack direction='horizontal' gap={1}>
                        <Image className='ally-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Lulu.png'} alt='thresh' />
                        Summoner 5
                    </Stack>
                </Stack>
            </div>
        </Stack>
    )
}

function parseGameTime(time) {
    let timer = "";
    timer = "" + parseInt(time / 60) + ":";
    let minutes = time % 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    timer = timer + minutes;
    return timer;
}


{/* <Stack className={"match " + gameStatus} direction="horizontal">
<Stack>
    <p>{gameInfo.gameMode}</p>                      
    <p>{gameTimer}</p>
    <p>{gameInfo.gameDate}</p>
</Stack>
<Stack>
    <p>{mainPlayer.victory ? "Victory" : "Defeat"}</p>
    <p>{mainPlayer.kills + "/" + mainPlayer.deaths + "/" + mainPlayer.assists}</p>
    <Image className='player-champ' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/' + mainPlayer.champion + '.png'} alt={mainPlayer.champion} />
</Stack>
<p>{gameInfo.matchId}</p>
</Stack> */}
export default Match;