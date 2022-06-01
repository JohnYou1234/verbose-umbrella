import express from 'express';
import fetch from 'node-fetch';
import { dirname }  from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3080;
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.resolve(__dirname, '../verbose_umbrella/build')));

const API_KEY = 'RGAPI-1002579b-3050-4e73-b3e6-24e46c15cdf3';
app.get('/api/getLevel/:name', async (req, res) => {
    let name = req.params.name;
    let link = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key='+ API_KEY;
    let level = await getLevel(link);
    res.send({
        "status": "success",
        level: level
    })
})
app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../verbose_umbrella/build', 'index.html'));
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