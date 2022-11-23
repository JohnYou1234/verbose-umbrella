import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Match from './Match.js'
import Spinner from 'react-bootstrap/Spinner';

function Results(props) {
    const [error, changeError] = useState('');
    const [players, changePlayers] = useState([]);
    const [isLoading, changeLoad] = useState(false);
    let { name } = useParams();
    let link = '/api/getMatches/' + name;
    const statPlayers = [
        {
            name: "Summoner",
            champion: "Champion",
            kills: "10",
            deaths: "1",
            assists: "34"
        },
        {
            name: "Summoner",
            champion: "Champion",
            kills: "10",
            deaths: "1",
            assists: "34"
        },
        {
            name: "Summoner",
            champion: "Champion",
            kills: "10",
            deaths: "1",
            assists: "34"
        },
        {
            name: "Summoner",
            champion: "Champion",
            kills: "10",
            deaths: "1",
            assists: "34"
        },
        {
            name: "Summoner",
            champion: "Champion",
            kills: "10",
            deaths: "1",
            assists: "34"
        },
        {
            name: "Summoner",
            champion: "Champion",
            kills: "10",
            deaths: "1",
            assists: "34"
        },
        {
            name: "Summoner",
            champion: " Champion",
            kills: "10",
            deaths: "1",
            assists: "34"
        },
        {
            name: "Summoner",
            champion: "Champion",
            kills: "10",
            deaths: "1",
            assists: "34"
        },
        {
            name: "Summoner",
            champion: "Champion",
            kills: "10",
            deaths: "1",
            assists: "34"
        },
        {
            name: "Summoner",
            champion: "Champion",
            kills: "10",
            deaths: "1",
            assists: "34"
        }
    ]

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
                changeError('');
                changePlayers(result.players)
            })
            .catch(err => {
                changeLoad(false);
                changeError(err)
            })
    }, [link])
    return (
        <div className="text-center">
            {isLoading &&   <Spinner className="loading-circle" animation="border" role="status" size="lg">
                                <span className="visually-hidden" >Loading...</span>
                            </Spinner>}
            {error && <p>{error + " is the error code"}</p>}
            {error.length === 0 && <Match players={players}/>}
        </div>
    )
}

export default Results;