const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'steamyreviews',
});

client.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connected to steamyreviews cassandra!');
});


// create
const create = (id, { rating, hours, description, helpful, funny, thread_length, user_username, user_recommended, user_steam_purchaser, user_numproducts, user_numreviews, user_icon, user_player_type, user_xp, user_friend_level, user_steam_level }, cb) => {
  // get the highest userid to increment on next insert
  client.execute('SELECT max(user_id), game, game_reviews FROM reviews WHERE gameid IN (?)', [id], { prepare: true }, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    const uid = results.rows[0]['system.max(user_id)'] + 1;
    const gameName = results.rows[0]['game'];
    const gameReviews = results.rows[0]['game_reviews'];
    const date = new Date();
    user_icon = 'http://d1i5z9gkmthkca.cloudfront.net/photos/product/1.jpeg';



    params = [id, gameName, gameReviews, rating, hours, description, helpful, funny, date.toISOString(), thread_length, uid, user_username, user_recommended, user_steam_purchaser, user_numproducts, user_numreviews, user_icon, user_player_type, user_xp, user_friend_level, user_steam_level];

    //console.log(params);
    client.execute('INSERT INTO reviews (gameid, game, game_reviews, rating, hours, description, helpful, funny, date_posted, thread_length, user_id, user_username, user_recommended, user_steam_purchaser, user_numproducts, user_numreviews, user_icon, user_player_type, user_xp, user_friend_level, user_steam_level) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', params, { prepare: true }, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      cb(null, { uid });
    });
  });
};

// read
const findId = (id, cb) => {
  client.execute('SELECT * FROM reviews WHERE gameid = ?', [id], { prepare: true }, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(results.rows.length);
    client.execute('SELECT count(user_id) FROM reviews WHERE gameid=?', [id], {prepare:true}, (err, count) => {
      if (err) {
        console.log(err);
      }
      const addLineBreaks = (str) => str.replace(/Þ/g, '\n');
      const data = [];
      const countReviews = count.rows[0]['system.count(user_id)'].low;
      results.rows.forEach((item) => {
        const newRow = {
          id: item.get('gameid'),
          game: item.get('game'),
          game_reviews: countReviews,
          rating: item.get('rating'),
          hours: item.get('hours'),
          description: addLineBreaks(item.get('description')),
          helpful: item.get('helpful'),
          funny: item.get('funny'),
          date_posted: item.get('date_posted'),
          language: 'EN',
          thread_length: item.get('thread_length'),
          user: {
            id: item.get('user_id'),
            username: item.get('user_username'),
            steam_purchaser: item.get('user_steam_purchaser'),
            recommended: item.get('user_recommended'),
            numProducts: item.get('user_numproducts'),
            numReviews: item.get('user_numreviews'),
            icon: item.get('user_icon'),
            player_type: item.get('user_player_type'),
            xp: item.get('user_xp'),
            friend_level: item.get('user_friend_level'),
            steam_level: item.get('user_steam_level'),
          },
        };
        data.push(newRow);
      });
      cb(null, data);
    });
  });
};

// update
const updateId = (gameid, uid, field, value, cb) => {
  let query;
  if (field === 'helpful') {
    query = 'UPDATE reviews SET helpful = ? WHERE gameid=? AND user_id=?';
  } else {
    query = 'UPDATE reviews SET funny = ? WHERE gameid=? AND user_id=?';
  }

  client.execute(query, [value, gameid, uid], { prepare: true }, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(results);
    cb(null, results);
  });
};

// delete review from specified user for given gameid
const deleteId = (id, { uid }, cb) => {
  client.execute('DELETE FROM reviews WHERE gameid=? AND user_id=?', [id, uid], { prepare: true }, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(results);
    cb(null, results);
  });
};

module.exports = { create, findId, updateId, deleteId };
