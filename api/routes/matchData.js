import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

import summonerSpells from './data/summonerSpells.json' 
import runes from './data/runes.json' 
import champions from './data/champions.json'

router.get('/getMatchData/:matchId/:puuid', async (req, res) => {
    const API_KEY = req.API_KEY
    let link = 'https://americas.api.riotgames.com/lol/match/v5/matches/' + req.params.matchId + '?api_key=' + API_KEY;
    let id = req.params.puuid;
    
    try {
        await fetch(link)
            .then(resp => resp.json())
            .then(data => {
                let playerData = getPlayerData(data.info.participants, id);
                let gameData = getGameData(data);
                res.send({
                    'status': 'success',
                    'playerData': playerData,
                    'gameInfo': gameData
                })
            })
    } catch(err) {
        res.send({
            'status': 'error',
            'error': "" + err
        })
    }
})

function getPlayerData(players, id) {
    let mainPlayer = {};
    let playerData = players.map((data) => {
        if (id === data.puuid) {
            mainPlayer.victory = data.win;
            mainPlayer.championIcon = 'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/' + champions.data[data.championName].image.full;
            mainPlayer.champion = data.championName;
            mainPlayer.kills = data.kills;
            mainPlayer.assists = data.assists;
            mainPlayer.deaths = data.deaths;
            mainPlayer.creepScore = data.totalMinionsKilled;
            mainPlayer.summoner1 = summonerSpells[data.summoner1Id];
            mainPlayer.summoner2 = summonerSpells[data.summoner2Id];
            mainPlayer.items = [data.item0, data.item1, data.item2, data.item3, data.item4, data.item5, data.item6];
            let styles = data.perks.styles;
            for (let i = 0; i < styles.length; i++) {
                if (data.perks.styles[i].description == "primaryStyle") {
                    const keyStone = runes[styles[i].style].slots[0].runes.find(obj => obj.id === styles[i].selections[0].perk);
                    mainPlayer.primaryIcon = 'https://ddragon.canisback.com/img/' + keyStone.icon;
                } else {
                    mainPlayer.secondaryIcon = 'https://ddragon.canisback.com/img/' + runes[styles[i].style].icon;
                }
            }
        }
        let player = {
            name: data.summonerName,
            championIcon: 'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/' + champions.data[data.championName].image.full,
            champion : data.championName
        }
        return player;
    })
    let data = {};
    data.mainPlayer = mainPlayer;
    data.allyTeam = playerData.slice(0, 5);
    data.enemyTeam = playerData.slice(5, 10);
    return data;
}

function getGameData(data) {
    let gameData = {};
    let info = data.info;
    gameData['matchId'] = data.metadata.matchId;
    gameData['gameMode'] = info.gameMode;
    gameData['gameTimer'] = info.gameDuration;

    let unixTimestamp = parseInt(info.gameEndTimestamp);
    let date = new Date(unixTimestamp);
    gameData['gameDate'] = date.toLocaleDateString("en-US")
    return gameData;
}
export default router;