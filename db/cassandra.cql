CREATE KEYSPACE steamyreviews
  WITH replication = { 'class': 'SimpleStrategy', 'replication_factor': 3};

CREATE TABLE test.reviews (
  gameId int,
  game text,
  game_reviews smallint,
  rating smallint,
  hours decimal,
  description text,
  helpful smallint,
  funny smallint,
  date_posted timestamp,
  thread_length smallint,
  user_id smallint,
  user_username text,
  user_recommended boolean,
  user_steam_purchaser boolean,
  user_numProducts smallint,
  user_numReviews smallint,
  user_icon text,
  user_player_type text,
  user_xp smallint,
  user_friend_level smallint,
  user_steam_level smallint,
  PRIMARY KEY (gameId, user_id)
) WITH comment = 'Q1: Find all reviews for a valid id' AND CLUSTERING ORDER BY (user_id ASC);
