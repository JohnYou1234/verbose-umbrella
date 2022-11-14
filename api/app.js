import express from 'express';
import { dirname }  from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// route imports
import apiRouter from './routes/playerData.js';

const app = express();
const PORT = process.env.PORT || 3080;
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.resolve(__dirname, '../verbose_umbrella/build')));
dotenv.config({ path: path.join(__dirname, '.env') });
const API_KEY = process.env.RIOT_KEY

app.use((req, res, next) => {
    req.API_KEY = API_KEY
    next()
})
app.use('/api', apiRouter);
app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
});