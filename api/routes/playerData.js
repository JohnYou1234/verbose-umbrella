import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/getLevel/:name', async (req, res) => {
    const API_KEY = req.API_KEY
    let name = req.params.name;
    let link = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key='+ API_KEY;
    try {
        let level = await getLevel(link);
        res.send({
            "status": "success",
            level: level
        })
    } catch(err) {
        console.log(err);
        res.send({
            'status': 'failure',
            'error': err
        })
    }
})

async function getLevel(link) {
    let level = 0;
    await fetch(link)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if (!data.summonerLevel && data.status.status_code == '404') {
                level = 'not found';
            } else {
                level = data.summonerLevel
            }
        })
        .catch(err => {
            console.log(err);
        })
    return level;
}

export default router;