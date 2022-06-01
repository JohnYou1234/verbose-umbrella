import express from 'express';
import fetch from 'node-fetch';
const app = express();
const PORT = 3080;
app.use(express.json());
const API_KEY = 'RGAPI-1002579b-3050-4e73-b3e6-24e46c15cdf3';
app.get('/api/getLevel/:name', async (req, res) => {
    let name = req.params.name;
    let link = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key='+ API_KEY;
    let level = await getLevel(link);
    console.log('asdfasfdf');
    res.send({
        "status": "success",
        level: level
    })
})
app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
});

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