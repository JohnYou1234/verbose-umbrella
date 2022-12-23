import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Match from './Match.js'
import Spinner from 'react-bootstrap/Spinner';
import './match.css'
function Matches(props) {
    const [error, changeError] = useState('');
    const [matches, changeMatchData] = useState([]); 
    const [isLoading, changeLoad] = useState(false);
    const [playerId, changePlayerId] = useState('');
    let { name } = useParams();
    let link = '/api/players/getPlayerData/' + name;
    useEffect(() => {   
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
                changeError('');
                changeMatchData(result.matches)
                changePlayerId(result.puuid);
            })
            .catch(err => {
                changeLoad(false);
                changeError(err)
            })
    }, [link])
    return (
        <div>
            {isLoading &&   <div className='text-center'>
                                <Spinner className="loading-circle" animation="border" role="status" size="lg">
                                    <span className="visually-hidden" >Loading...</span>
                                </Spinner>
                            </div>}
            {error && <p className="text-center" >{error + " is the error code"}</p>}
            <div className='matches'>
                {(matches.length > 0 && !error) && matches.map((matchId) => {
                    return <Match playerId={playerId} key={matchId} matchId={matchId} changeError={changeError}/>
                })}
            </div>
        </div>
    )
}

export default Matches;