import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive'

import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown';
import './detailedMatch.css';

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

    let championIcons = function(players) { 
        return players.map(player => {
            return <th className='column-header' key={player.championIcon}><Image roundedCircle className='champ-headers' src={player.championIcon}/></th>
        })
    }
    
    let playerData =  players.map(player => {
        if (category === 'all') 
            return {
                ...player.communication,
                ...player.damage,
                ...player.gold,
                ...player.objectives,
                ...player.support
            }

        return {
            ...player[category]
        }
    })
    
    function handleCategoryChange(e) {
        changeCategory(e.target.value);
    }

    function showStats(playerData) {
        if (playerData.length == 0) return <tbody><tr><td>No players atm</td></tr></tbody>
        let rows = [];
        for (const category in playerData[0]) {
            rows.push(category);
        }
        return (
            <tbody>
                {rows.map((category, i) => {
                    return (
                        <tr key={i}>
                            <th>{camelToWords(category)}</th>
                            {playerData.map((player, i) => {
                                return <td key={i}>{player[category]}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        )
    }
    function Table(players, start, end, includeBtn) {
        return (
            <table>
                <thead>
                    <tr>
                        {includeBtn ? 
                        <th>                    
                            <select name="categoryToggle" id="categoryToggle" onChange={handleCategoryChange}>
                                <option value="all">All</option>
                                <option value="communication">Communication</option>
                                <option value="damage">Damage</option>
                                <option value="gold">Gold</option>
                                <option value="objectives">Objectives</option>
                                <option value="support">Support</option>
                            </select>
                        </th>
                        : <th> </th>
                        }
                        {championIcons(players.slice(start, end))}
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
            {(!isLoading) && 
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


function camelToWords(category) {
    category = category.replace(/([a-z])([A-Z])/g, '$1 $2'); // separates all camels
    category = category.charAt(0).toUpperCase() + category.slice(1);
    return category;
}

export default DetailedMatch;