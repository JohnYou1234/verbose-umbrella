import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
function Results(props) {
    const [level, changeLevel] = useState(0);
    let key = props.apiKey;
    let { name } = useParams();
    let link = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key='+key;
    useEffect(() => {
        fetch(link)
            .then(resp => resp.json())
            .then(result => {
                changeLevel(result.summonerLevel);
            })
            .catch(err => {
                console.log(err);
            })
    })
    return (
        <div>
            <p>
                This player's level is {level}!
            </p>
        </div>
    )
}


export default Results;