DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  gameId integer,
  game text,
  game_reviews integer,
  rating integer,
  hours numeric(4,1),
  description text,
  helpful integer,
  funny integer,
  date_posted text,
  thread_length integer,
  user_id integer,
  user_username text,
  user_recommended boolean,
  user_steam_purchaser boolean,
  user_numProducts integer,
  user_numReviews integer,
  user_icon text,
  user_player_type text,
  user_xp integer,
  user_friend_level integer,
  user_steam_level integer,
  PRIMARY KEY (gameId, user_id)
);
