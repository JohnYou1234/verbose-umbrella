import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const API_KEY = 'RGAPI-1002579b-3050-4e73-b3e6-24e46c15cdf3';

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
        })
        .catch(err => {
            console.log(err);
        })
    return level;
}

export default router;