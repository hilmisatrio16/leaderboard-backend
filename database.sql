CREATE DATABASE leaderboard;

CREATE TABLE leaderboards(
    board_id SERIAL PRIMARY KEY,
    game VARCHAR(30),
    player VARCHAR(30),
    score INT
);

SELECT * FROM leaderboards;

INSERT INTO leaderboards (game, player, score) VALUES ('hordezee', 'Hilmi', 15);

--psql -U postgres

--l\c leaderboard