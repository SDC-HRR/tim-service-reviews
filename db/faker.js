const faker = require('faker');
const db = require('./index.js');

const playerTypes = ['Power Player', '3 Years of Service', 'Walking Tall', 'Amber'];

for (let i = 0; i < 100; i += 1) {
  const currentGame = faker.commerce.productName();

  const reviewCount = Math.floor(Math.random(1) * 50);

  for (let j = 0; j < reviewCount; j += 1) {
    const newUser = {
      id: j,
      username: faker.internet.userName(),
      recommended: faker.random.boolean(),
      steam_purchaser: faker.random.boolean(),
      numProducts: faker.random.number(500),
      numReviews: faker.random.number(500),
      icon: faker.image.imageUrl(),
      player_type: faker.random.arrayElement(playerTypes),
      xp: faker.random.number(1000),
      friend_level: faker.random.number(50),
      steam_level: faker.random.number(1000),
    };

    const newReview = {
      id: i,
      game: currentGame,
      game_reviews: reviewCount,
      rating: faker.random.number(reviewCount),
      hours: faker.finance.amount(0, 100, 1),
      description: faker.lorem.paragraphs(),
      helpful: faker.random.number(1000),
      funny: faker.random.number(1000),
      date_posted: faker.date.past(),
      thread_length: faker.random.number(50),
      user: newUser,
    };

    db.create(newReview);
  }
}

const curatedGame = 'Half-Life: Alyx';

const reviewCount = Math.floor(Math.random() * 50);

const usernames = ['Captain Rubrick', 'Ross', 'Alyx', 'Murican Bear', 'Jurassic Productions', 'Breezy', 'josh', 'Sajjan', 'Sajjan Cookie', 'Haydur', 'JSON Mraz'];

const avatars = ['https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/38/38a46c12915320b6351c3ea8e09ff6f0c5d269d9.jpg', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/bd/bdc9c780b4dbfb7f92bd494e6b85e2c12b3fa479.jpg', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/de/de27071ff472856d7a022db244beced191c4c5ea.jpg', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c4/c42ad4ff3b2405b037b619786f8ad4780e8ee0fa.jpg'];

for (let j = 0; j < reviewCount; j += 1) {
  const curatedUser = {
    id: j,
    username: faker.random.arrayElement(usernames),
    recommended: faker.random.boolean(),
    steam_purchaser: faker.random.boolean(),
    numProducts: faker.random.number(500),
    numReviews: faker.random.number(500),
    icon: faker.random.arrayElement(avatars),
    player_type: faker.random.arrayElement(playerTypes),
    xp: faker.random.number(1000),
    friend_level: faker.random.number(50),
    steam_level: faker.random.number(1000),
  };

  const curatedReview = {
    id: 237,
    game: curatedGame,
    game_reviews: reviewCount,
    rating: faker.random.number(reviewCount),
    hours: faker.finance.amount(0, 100, 1),
    description: faker.lorem.paragraphs(),
    helpful: faker.random.number(1000),
    funny: faker.random.number(1000),
    date_posted: faker.date.past(),
    thread_length: faker.random.number(50),
    user: curatedUser,
  };

  db.create(curatedReview);
}