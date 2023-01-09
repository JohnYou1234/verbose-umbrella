import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/getPlayerData/:name', async (req, res) => {
    const API_KEY = req.API_KEY
    let name = req.params.name;
    let link = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key='+ API_KEY;
    let id;
    try {
        await fetch(link)
            .then(resp => {
                if (resp.status === 404) {
                    throw "Server Not Working"
                } else if (resp.status === 500) {
                    throw "Error with Riot's Server"
                } 
                return resp.json()
            })
            .then(data => {
                if (!data.puuid) {
                    throw "User not found"
                } 
                return data.puuid;
            })
            .then(puuid => {
                id = puuid;
                if (!puuid) throw "No associated user found"
                let puidLink = 'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/' + puuid + '/ids?start=0&count=5&api_key=' + API_KEY;
                return fetch(puidLink);
            })
            .then(response => response.json())
            .then(matchArray => {
                res.send({
                    'status': 'success',
                    'matches': matchArray,
                    'puuid': id
                })
            })
    } catch(err) {
        res.send({
            'status': 'error',
            'error': "" + err
        })
    }
})

export default router;