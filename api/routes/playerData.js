import express, { response } from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/getMatches/:name', async (req, res) => {
    const API_KEY = req.API_KEY
    let name = req.params.name;
    console.log(name);
    let link = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key='+ API_KEY;
    try {
        await fetch(link)
            .then(resp => resp.json())
            .then(data => {
                if (!data.puuid && data.status.status_code == '404') {
                    throw "No User Found"
                } else {
                    return data.puuid;
                }
            })
            .then(puuid => {
                if (!puuid) throw "No associated user found"
                let puidLink = 'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/' + puuid + '/ids?start=0&count=1&api_key=' + API_KEY;
                return fetch(puidLink);
            })
            .then(response => response.json())
            .then(matchArray => {
                let match = matchArray[0];
                let matchLink = 'https://americas.api.riotgames.com/lol/match/v5/matches/' + match + '?api_key=' + API_KEY;
                return fetch(matchLink);
            })
            .then(response => response.json())
            .then(data => {
                let playerData = getPlayerData(data.info.participants);
                res.send({
                    'status': 'success',
                    'players': playerData
                })
            })
    } catch(err) {
        console.log(err);
        res.send({
            'status': 'error',
            'error': "" + err
        })
    }
})

function getPlayerData(players) {
    let playerData = players.map((data, index) => {
        if (index == 1) console.log(data)
        let player = {
            name: data.summonerName,
            champion: data.championName
        }
        return player;
    })
    return playerData
}
export default router;