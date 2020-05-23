const fs = require('fs');
const faker = require('faker');


const fieldString = 'id, game, game_reviews, rating, hours, description, helpful, funny, date_posted, thread_length, user.id, user.username, user.recommended, user.steam_purchaser, user.numProducts, user.numReviews, user.icon, user.player_type, user.xp, user.friend_level, user.steam_level\n';

const writeReviews = fs.createWriteStream('./db/dataBIG.csv');
writeReviews.write(fieldString);

// setup
const playerTypes = ['Power Player', '3 Years of Service', 'Walking Tall', 'Amber'];
const images = [];
for (let i = 1; i <= 500; i += 1) {
  // S3: https://hrr45-fec.s3.us-east-2.amazonaws.com/photos/product/
  images.push(`http://d1i5z9gkmthkca.cloudfront.net/photos/product/${i}.jpeg`);
}

let buildReviews = (fileFeeder, encoding, cb) => {
  let i = 10000000;
  let id = 0;
  const feed = () => {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const game = faker.commerce.productName();
      let game_reviews = Math.floor(Math.random() * 5) + 1;
      if (id <= 5) {
        game_reviews = Math.floor(Math.random() * (50 - 20 + 1) + 20);
      }
      for (let j = 0; j < game_reviews; j += 1) {
        const r = faker.random.number(game_reviews);
        const h = faker.finance.amount(0, 100, 1);
        const d = faker.lorem.paragraphs();
        const ha = faker.random.number(1000);
        const f = faker.random.number(1000);
        const da = faker.date.past(0.25, new Date());
        const t = faker.random.number(50);
        const u_id = j + 1;
        const u_u = faker.internet.userName();
        const u_r = faker.random.boolean();
        const u_s = faker.random.boolean();
        const u_n = faker.random.number(500);
        const u_na = faker.random.number(500);
        const u_i = faker.random.arrayElement(images);
        const u_p = faker.random.arrayElement(playerTypes);
        const u_x = faker.random.number(1000);
        const u_f = faker.random.number(50);
        const u_sa = faker.random.number(1000);
        const item = `${id}, "${game}", ${game_reviews}, ${r}, ${h}, "${d}", ${ha}, ${f}, ${da}, ${t}, ${u_id}, "${u_u}", ${u_r}, ${u_s}, ${u_n}, ${u_na}, "${u_i}", "${u_p}", ${u_x}, ${u_f}, ${u_sa}\n`;
        if (i === 0) {
          fileFeeder.write(item, encoding, cb);
        } else {
          ok = fileFeeder.write(item, encoding);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      fileFeeder.once('drain', feed);
    }
  };
  feed();
};

buildReviews(writeReviews, 'utf-8', () => {
  writeReviews.end();
});
