import express from 'express';
import { dirname }  from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

// route imports
import apiRouter from './routes/playerData.js';
const app = express();
const PORT = process.env.PORT || 3080;
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.resolve(__dirname, '../verbose_umbrella/build')));

app.use('/api', apiRouter);
app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../verbose_umbrella/build', 'index.html'));
});
