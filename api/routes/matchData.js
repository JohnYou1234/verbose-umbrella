import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

const { default: runes } = await import('./data/runes.json', {assert: {type: "json",},});
const { default: summonerSpells } = await import('./data/summonerSpells.json', {assert: {type: "json",},});
const { default: champions } = await import('./data/champions.json', {assert: {type: "json",},});

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
    let mainPlayerTeam = -1;
    let playerData = players.map((data, index) => {
        let player = {};
        player.victory = data.win;
        player.championIcon = 'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/' + champions.data[data.championName].image.full;
        player.name = data.summonerName;
        player.kills = data.kills;
        player.assists = data.assists;
        player.deaths = data.deaths;
        player.creepScore = data.totalMinionsKilled;
        player.summoner1 = summonerSpells[data.summoner1Id];
        player.summoner2 = summonerSpells[data.summoner2Id];
        player.items = [data.item0, data.item1, data.item2, data.item3, data.item4, data.item5, data.item6];
        let styles = data.perks.styles;
        for (let i = 0; i < styles.length; i++) {
            if (data.perks.styles[i].description == "primaryStyle") {
                const keyStone = runes[styles[i].style].slots[0].runes.find(obj => obj.id === styles[i].selections[0].perk);
                player.primaryIcon = 'https://ddragon.canisback.com/img/' + keyStone.icon;
            } else {
                player.secondaryIcon = 'https://ddragon.canisback.com/img/' + runes[styles[i].style].icon;
            }
        }
        if (id === data.puuid) {
            mainPlayer = player;
            mainPlayerTeam = Math.floor(index / 5);
        }
        return player;
    })
    let data = {};
    data.mainPlayer = mainPlayer;
    data.allyTeam = playerData.slice(mainPlayerTeam * 5, mainPlayerTeam * 5 + 5); // 0-5 5-10
    data.enemyTeam = playerData.slice(5 - mainPlayerTeam * 5, 5 - mainPlayerTeam * 5 + 5); // 5-10 0-5
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