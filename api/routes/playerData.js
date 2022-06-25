import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/getLevel/:name', async (req, res) => {
    const API_KEY = req.API_KEY
    let name = req.params.name;
    let link = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key='+ API_KEY;
    try {
        await fetch(link)
            .then(resp => resp.json())
            .then(data => {
                if (!data.summonerLevel && data.status.status_code == '404') {
                    return 'not found';
                } else {
                    return data.summonerLevel;
                }
            })
            .then(level => {
                res.send({
                    'status': 'success',
                    'level': level
                })
            })
            .catch(err => {
                res.send({
                    'status': 'failure',
                    'error': err
                })
            })
    } catch(err) {
        console.log(err);
        res.send({
            'status': 'failure',
            'error': err
        })
    }
})
export default router;