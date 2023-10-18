DROP TABLE IF EXISTS nails;

CREATE TABLE nails (
    nails_id INT,
    char_name VARCHAR(100),
    votes INT,
    PRIMARY KEY( nails_id )
);

INSERT INTO nails (nails_id, char_name, votes)
VALUES
(0, 'Cobweb', 0),
(1, 'Flames', 0),
(2, 'Ghosts', 0),
(3, 'Halloween French Tip', 0),
(4, 'Polka Dot', 0),
(5, 'Purple French Tip', 0),
(6, 'Christmas', 0);