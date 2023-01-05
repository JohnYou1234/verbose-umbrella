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
                changeLoad(false);
                loadPlayers(result.playerData.players)
            })
            .catch(err => {
                changeLoad(false);
                console.log(err);
            })
    }, [0])

    return (
        <div>
            {isLoading &&   <div className='text-center'>
                                <Spinner className="loading-circle" animation="border" role="status" size="lg">
                                    <span className="visually-hidden" >Loading...</span>
                                </Spinner>
                            </div>}
            {error && <p className="text-center" >{error + " is the error code"}</p>}
            {!isLoading && isDesktop ? 
                desktopTable(players)
            : 
            <div id='detailed-table'>
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
                            <th><Image roundedCircle className='champ-headers' src='http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'/></th>
                            <th><Image roundedCircle className='champ-headers' src='http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'/></th>
                            <th><Image roundedCircle className='champ-headers' src='http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'/></th>
                            <th><Image roundedCircle className='champ-headers' src='http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'/></th>
                            <th><Image roundedCircle className='champ-headers' src='http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tempHelper("KDA", "20/3/20", 5)}
                        {tempHelper("Largest Multi Kill", "4", 5)}
                        {tempHelper("CC Score", "23", 5)}
                        {tempHelper("Random ULTARA LONG NAME", "2342344",5)}
                        {tempHelper("Creep Score", "322",5)}
                        {tempHelper("Total Damage to Champions", "32444",5)}
                        {tempHelper("Total Damage to Turrets", "6000",5)}
                    </tbody>
                    <thead>
                        <tr>
                            <th>                    
                            </th>
                            <th><Image roundedCircle className='champ-headers' src='http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'/></th>
                            <th><Image roundedCircle className='champ-headers' src='http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'/></th>
                            <th><Image roundedCircle className='champ-headers' src='http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'/></th>
                            <th><Image roundedCircle className='champ-headers' src='http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'/></th>
                            <th><Image roundedCircle className='champ-headers' src='http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/Gangplank.png'/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tempHelper("KDA", "20/3/20", 5)}
                        {tempHelper("Largest Multi Kill", "4", 5)}
                        {tempHelper("CC Score", "23", 5)}
                        {tempHelper("Random ULTARA LONG NAME", "2342344",5)}
                        {tempHelper("Creep Score", "322",5)}
                        {tempHelper("Total Damage to Champions", "32444",5)}
                        {tempHelper("Total Damage to Turrets", "6000",5)}
                    </tbody>
                </table>
            </div>}
        </div>
    )
}

function desktopTable(players) {
    let icons = players.map(data => {
        console.log(data.championIcon);
        return <th><Image roundedCircle className='champ-headers' src={data.championIcon}/></th>
    })
    return (
        <div id='detailed-table'>
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
                        {icons}
                    </tr>
                </thead>
                <tbody>
                    {tempHelper("KDA", "20/3/20")}
                    {tempHelper("Largest Multi Kill", "4")}
                    {tempHelper("CC Score", "23")}
                    {tempHelper("Random ULTARA LONG NAME", "2342344")}
                    {tempHelper("Creep Score", "322")}
                    {tempHelper("Total Damage to Champions", "32444")}
                    {tempHelper("Total Damage to Turrets", "6000")}
                </tbody>
            </table>
        </div>
    )
}

function tempHelper(name, stat, numb = 10) {
    let list = [];
    for (let i = 0; i < numb; i++) {
        list.push(<td key={i}>{stat}</td>)
    }
    return (
        <tr>
            <th>{name}</th>
            {list}
        </tr>
    )
}
export default DetailedMatch;