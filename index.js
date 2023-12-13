import express, {json} from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {origin: process.env.URL || '*'}

app.use(cors(corsOptions));
app.use(json());

app.get('/leaderboards', async(req, res) => {
    try{
        const boards = await pool.query('SELECT * FROM leaderboards');
        res.json(boards.rows);

    }catch(error){
        console.log(error.message);
    }
});

app.get('/leaderboards/:game', async(req, res) => {

    try{
        const {game} = req.params
        const boardGame = await pool.query('SELECT * FROM leaderboards WHERE game = $1 ORDER BY score DESC', [game]);
        res.json(boardGame.rows);
    }catch(error){
        console.log(error.message)
    }
});

app.post('/leaderboards/:game', async(req, res) =>{
    try{
        const { game } = req.params
        const { player , score} = req.body
        const board = await pool.query('INSERT INTO leaderboards (game, player, score) VALUES ($1, $2, $3) RETURNING *', [game, player, score]);
        const del = await pool.query('DELETE FROM leaderboards WHERE game = $1 AND board_id NOT IN (SELECT board_id FROM leaderboards WHERE game = $1 ORDER BY score DESC limit $2);', [game, 10]);
        return res.json(board.rows[0]);
    }catch(error){
        console.log(error.message)
    }
});

app.listen(PORT, () =>{
    console.log(`Server is listening on port:${PORT}`);
})


