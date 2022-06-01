import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
function Results(props) {
    const [level, changeLevel] = useState('loading');
    let { name } = useParams();
    let link = '/api/getLevel/' + name;
    useEffect(() => {
        fetch(link)
            .then(resp => resp.json())
            .then(result => {
                console.log(result);
                changeLevel(result.level);
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