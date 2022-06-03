import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const API_KEY = 'RGAPI-6017c56d-e6fb-483e-be83-3543f98ed466';

router.get('/getLevel/:name', async (req, res) => {
    let name = req.params.name;
    let link = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key='+ API_KEY;
    let level = await getLevel(link);
    res.send({
        "status": "success",
        level: level
    })
})

async function getLevel(link) {
    let level = 0;
    await fetch(link)
        .then(resp => resp.json())
        .then(data => {
            level = data.summonerLevel
            console.log(level);
        })
        .catch(err => {
            console.log(err);
        })
    return level;
}

export default router;