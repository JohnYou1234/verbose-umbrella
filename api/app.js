import express from 'express';
import { dirname }  from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

// route imports
import playerRouter from './routes/playerData.js';
import matchRouter from './routes/matchData.js';
import detailedMatchRouter from './routes/detailedMatchData.js'
const app = express();
const PORT = process.env.PORT || 3080;
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.resolve(__dirname, '../verbose_umbrella/build')));
const API_KEY = process.env.RIOT_KEY

app.use((req, res, next) => {
    req.API_KEY = API_KEY
    next()
})
app.use('/api/players', playerRouter);
app.use('/api/matches', matchRouter);
app.use('/api/detailed', detailedMatchRouter)
app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../verbose_umbrella/build', 'index.html'));
});