import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Match from './Match.js'
function Results(props) {
    const [error, changeError] = useState('');
    const [players, changePlayers] = useState([]);
    let { name } = useParams();
    let link = '/api/getMatches/' + name;
    useEffect(() => {
        fetch(link)
            .then(resp => {
                if (resp.status != 400) {console.log("world is mine"); throw "Error " + resp.status}
            })
            .then(resp => resp.json())
            .then(result => {
                if (result.status === 'error') throw result.error
                changeError('');
                changePlayers(result.players)
            })
            .catch(err => {
                changeError(err)
            })
    }, [link])
    return (
        <div>
            {error.length > 0 && <p>{error}</p>}
            {error.length == 0 && <Match players={players}/>}
        </div>
    )
}


export default Results;