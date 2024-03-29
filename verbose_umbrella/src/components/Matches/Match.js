import { useEffect, useState } from 'react';
import {Stack, Image} from 'react-bootstrap';
import Dropdown from './Dropdown.js';

function Match(props) {
    const [isLoading, changeLoad] = useState(true);
    const [gameData, changeGameData] = useState({});
    const [isDetailed, changeDetail] = useState(false);
    let changeError = props.changeError;
    let matchId = props.matchId;
    let playerId = props.playerId;
    let link = '/api/matches/getMatchData/' + matchId + '/' + playerId;
    useEffect(() => {   
        changeLoad(true);
        fetch(link)
            .then(resp => {
                if (resp.status !== 200) throw resp.status;
                return resp;
            })
            .then(resp => resp.json())
            .then(result => {
                if (result.status === 'error') throw result.error
                changeLoad(false);
                changeGameData(result);
            })
            .catch(err => {
                changeError(err)
                changeLoad(false);
            })
    }, [0])
    if (isLoading) {
        return (
        <div className={'match victory'}>

        </div>
        )
    }
    function handleChange() {
        changeDetail(!isDetailed);
    }
    let playerData = gameData.playerData;
    let mainPlayer = playerData.mainPlayer;
    let gameInfo = gameData.gameInfo;
    let gameTimer = parseGameTime(gameInfo.gameTimer);
    let gameResult = mainPlayer.victory ? "victory" : "defeat";
    let gold = parseGold(mainPlayer.goldEarned);
    return (
        <div className={`match ${gameResult}`}>
            <Stack onClick={handleChange} className="justify-content-center" gap={3} direction="horizontal">
                <div>
                    <Stack gap={1}>
                        <div>{mainPlayer.victory ? "Victory" : "Defeat"}</div>       
                        <div>{gameInfo.gameMode}</div>               
                        <div>{gameTimer}</div>
                        <div>{gameInfo.gameDate}</div>
                    </Stack>
                </div>
                <div>
                    <Stack>
                    <Image className='main-champ' src={mainPlayer.championIcon} alt={mainPlayer.champion}/>
                    <Stack direction="horizontal" gap={0}>
                        <Image className='ss-icon' src={'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/' + mainPlayer.summoner1 + '.png'} alt={mainPlayer.summoner1} />
                        <Image className='ss-icon' src={'https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/' + mainPlayer.summoner2 + '.png'} alt={mainPlayer.summoner2} />
                    </Stack>
                    </Stack>
                </div>
                <div>
                    <Stack>
                        <Image className='rune-icon ss-icon' src={mainPlayer.primaryIcon} alt='rune' />
                        <Image className='rune-icon ss-icon' src={mainPlayer.secondaryIcon} alt={mainPlayer.secondary} />
                    </Stack>
                </div>
                <div>
                    <Stack gap="1" >
                        <div>{mainPlayer.kills + "/" + mainPlayer.deaths + "/" + mainPlayer.assists}</div>
                        <div>{mainPlayer.creepScore + " cs"}</div>
                        <div>{gold + " gold"}</div>
                    </Stack>
                </div>
                <div>
                    <Stack gap={1} direction="horizontal">
                        {itemsToDiv(mainPlayer.items)}
                    </Stack>
                </div>

                <div>
                    <Stack gap={1} className="ally-team">
                        {playerData.allyTeam.members.map((data) => {
                            return (
                                <Stack key={data.name} direction='horizontal' gap={1}>
                                    <Image className='ally-icon'src={data.championIcon} alt={data.champion}/>
                                    {data.name}
                                </Stack>
                            )
                        })}
                    </Stack>
                </div>

                <div>
                    <Stack gap={1} className="enemy-team">
                        {playerData.enemyTeam.members.map((data) => {
                            return (
                                <Stack key={data.name} direction='horizontal' gap={1}>
                                    <Image className='ally-icon'src={data.championIcon} alt={data.champion}/>
                                    {data.name}
                                </Stack>
                            )
                        })}
                    </Stack>
                </div>
            </Stack>
            {isDetailed &&
                <Dropdown playerData={gameData.playerData} matchId={matchId} key={matchId}
                parseGold={(gold) => parseGold(gold)}/>
            }
        </div>
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

function itemsToDiv(items) {
    items = items.map((data, index) => {
        if (data === 0) return <div key={index} className="item-icon bg"></div>;
        return <Image key={index} className='item-icon' src={'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/' + data + '.png'} alt={data} />
    })

    let itemStacks = (
        <div className='d-flex flex-column'>
            <div className='d-flex flex-row'>
                {items.slice(0, 3)}
            </div>
            <div className='d-flex flex-row'>
                {items.slice(3, 6)}
            </div>
        </div>
    )
    return (
        <Stack gap={1} direction='horizontal'>
            {itemStacks}
            {items[6]}
        </Stack>
    )
}

function parseGold(goldCount) {
    if (goldCount < 1000) return goldCount;
    let whole = Math.floor(goldCount / 1000);
    let part = Math.floor((goldCount % 1000) / 100);
    return `${whole}.${part}k`;
}
export default Match;