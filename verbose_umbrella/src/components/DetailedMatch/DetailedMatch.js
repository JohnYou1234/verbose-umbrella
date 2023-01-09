import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'

import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown';
import './detailedMatch.css';
import { darkmagenta } from 'color-name';

function DetailedMatch(props) {
    const [error, changeError] = useState('');
    const [isLoading, changeLoad] = useState(false);
    const [players, loadPlayers] = useState([]);
    const [category, changeCategory] = useState("all");
    let { matchId } = useParams();

    const isDesktop = useMediaQuery({ minWidth: 998 })

    useEffect(() => {   
        let link = '/api/detailed/getMatch/' + matchId;
        changeLoad(true);
        fetch(link)
            .then(resp => {
                if (resp.status !== 200) throw resp.status;
                return resp;
            })
            .then(resp => {
                return resp.json()
            })
            .then(result => {
                if (result.status === 'error') throw result.error
                loadPlayers(result.playerData.players)
            })
            .catch(err => {
                changeLoad(false);
            })
    }, [0])
    if (players.length > 0 && isLoading) changeLoad(false);

    let icons = function(players) {
        return players.map(player => {
            return <th key={player.championIcon}><Image roundedCircle className='champ-headers' src={player.championIcon}/></th>
        })
    }
    
    let playerData =  players.map(player => {
        return {
            ...player.communication,
            ...player.damage,
            ...player.gold,
            ...player.objectives,
            ...player.support
        }
    })
    function desktopTable(players) {
        return (
        <table>
            <thead>
                <tr>
                    <th>                    
                        <Dropdown className='hello'>
                            <Dropdown.Toggle variant="success">
                                All
                            </Dropdown.Toggle>
    
                            <Dropdown.Menu>
                                <Dropdown.Item>All</Dropdown.Item>
                                <Dropdown.Item>Combat</Dropdown.Item>
                                <Dropdown.Item>Disruption</Dropdown.Item>
                                <Dropdown.Item>Support</Dropdown.Item>
                                <Dropdown.Item>Gold</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </th>
                    {icons(players)}
                </tr>
            </thead>
            {
                showStats(playerData)
            }
        </table>
        )
    }
    
    function Table(players, start, end, includeBtn) {
        return (
            <table>
                <thead>
                    <tr>
                        {includeBtn ? 
                        <th>                    
                            <Dropdown className='hello'>
                                <Dropdown.Toggle variant="success">
                                    All
                                </Dropdown.Toggle>
        
                                <Dropdown.Menu>
                                    <Dropdown.Item>All</Dropdown.Item>
                                    <Dropdown.Item>Combat</Dropdown.Item>
                                    <Dropdown.Item>Disruption</Dropdown.Item>
                                    <Dropdown.Item>Support</Dropdown.Item>
                                    <Dropdown.Item>Gold</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </th>
                        : <th> </th>
                        }
                        {icons(players.slice(start, end))}
                    </tr>
                </thead>
                {showStats(playerData.slice(start, end))}
            </table>
        )
    }
    return (
        <div>
            {isLoading &&   <div className='text-center'>
                                <Spinner className="loading-circle" animation="border" role="status" size="lg">
                                    <span className="visually-hidden" >Loading...</span>
                                </Spinner>
                            </div>}
            {error && <p className="text-center" >{error + " is the error code"}</p>}
            {!isLoading && 
            <div id='detailed-table'>
                {isDesktop ? 
                    Table(players, 0, 10, true)
                : 
                <>
                {Table(players, 0, 5, true)}
                {Table(players, 5, 10)}
                </>}
            </div>}
        </div>
    )
}

function showStats(playerData) {
    if (playerData.length == 0) return <p>Fail no players</p>
    let rows = [];
    for (const category in playerData[0]) {
        rows.push(category);
    }
    return (
        <tbody>
            {rows.map(category => {
                return (
                    <tr key={category}>
                        <th>{category}</th>
                        {playerData.map(playerData => {
                            return <td key={playerData.name}>{playerData[category]}</td>
                        })}
                    </tr>
                )
            })}
        </tbody>
    )
}
export default DetailedMatch;