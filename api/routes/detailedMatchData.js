import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/getMatch/:matchId/', async (req, res) => {
    const API_KEY = req.API_KEY
    let matchId = req.params.matchId;
    
    try {
        console.log(matchId);
        res.send({
            matchId: matchId
        })
    } catch(err) {
        res.send({
            'status': 'error',
            'error': "" + err
        })
    }
})
export default router;