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
                if (resp.status !== 200) throw resp.status;
                return resp;
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
            {error && <p>{error + " is the error code"}</p>}
            {error.length === 0 && <Match players={players}/>}
        </div>
    )
}


export default Results;