import express from 'express';
import fetch from 'node-fetch';
import champions from './data/champions.json';
const router = express.Router();
router.get('/getMatch/:matchId', async (req, res) => {
    const API_KEY = req.API_KEY
    let matchId = req.params.matchId;
    let link = 'https://americas.api.riotgames.com/lol/match/v5/matches/' + matchId + '?api_key=' + API_KEY;

    try {
        await fetch(link)
            .then(resp => resp.json())
            .then(data => {
                res.send({
                    'status': 'success',
                    'playerData': getPlayerData(data)
                })
            })
    } catch(err) {
        res.send({
            'status': 'error',
            'error': "" + err
        })
    }
})

function getPlayerData(data) {
    let players = data.info.participants;   
    players = players.map(data => {
        return {
            name: data.summonerName,
            championIcon : 'http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/' + champions.data[data.championName].image.full,
            communication: {
                allInPings: data.allInPings,
                assistMePings: data.assistMePings,
                baitPings: data.baitPings,
                basicPings: data.basicPings,
                dangerPings: data.dangerPings,
                enemyMissingPings: data.enemyMissingPings,
                enemyVisionPings: data.enemyVisionPings,
                getBackPings: data.getBackPings,
                needVisionPings: data.needVisionPings,
                onMyWayPings: data.onMyWayPings
            },
            damage : {
                kills: data.kills,
                assists: data.assists,
                deaths: data.deaths,
                damageToChampions: data.totalDamageDealtToChampions,
                largestKillingSpree: data.largestKillingSpree,
                largestMultiKill: data.largestMultiKill,
                magicDamageDealtToChampions: data.magicDamageDealtToChampions,
                physicalDamageDealtToChampions: data.physicalDamageDealtToChampions,
                solokills: data.challenges.soloKills,
                totalDamageTaken: data.totalDamageTaken,
                trueDamageDealtToChampions: data.trueDamageDealtToChampions
            },
            gold: {
                bountyGold: data.challenges.bountyGold,
                consumablesPurchased: data.consumablesPurchased,
                goldEarned: data.goldEarned,
                goldSpent: data.goldSpent,
                itemsPurchased: data.itemsPurchased
            },
            objectives: {
                damageDealtToBuildings: data.damageDealtToBuildings,
                damageDealtToObjectives: data.damageDealtToObjectives,
                damageDealtToTurrets: data.damageDealtToTurrets,
                dragonKills: data.dragonKills,
                objectivesStolen: data.objectivesStolen,
                turretTakedowns: data.turretTakedowns,
                
            },
            support: {
                controlWards: data.visionWardsBoughtInGame,
                detectorWardsPlaced: data.detectorWardsPlaced,
                totalHealsOnTeammates: data.totalHealsOnTeammates,
                totalDamageShieldedOnTeammates: data.totalDamageShieldedOnTeammates,
                visionScore: data.visionScore,
                wardsKilled: data.wardsKilled,
                wardsPlaced: data.wardsPlaced
            }
        }
    })
    return ({
        status: 'success',
        players: players
    })
}
export default router;