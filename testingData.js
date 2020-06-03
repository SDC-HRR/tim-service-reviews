const fs = require('fs');
const faker = require('faker');


const fieldString = 'id|rating|hours|description|helpful|funny|thread_length|user_username|user_recommended|user_steam_purchaser|user_numproducts|user_numreviews|user_icon|user_player_type|user_xp|user_friend_level|user_steam_level\n';

const removeLines = (str) => str.replace(/[\r\n]+/gm, 'Þ');

const writeReviews = fs.createWriteStream('./reviewsTestData.csv');
writeReviews.write(fieldString);

// setup
const playerTypes = ['Power Player', '3 Years of Service', 'Walking Tall', 'Amber'];
const images = [];
for (let i = 1; i <= 500; i += 1) {
  // S3: https://hrr45-fec.s3.us-east-2.amazonaws.com/photos/product/
  images.push(`http://d1i5z9gkmthkca.cloudfront.net/photos/product/${i}.jpeg`);
}

const buildTests = (fileFeeder, encoding, cb) => {
  let i = 100000;
  let id = 0;
  const feed = () => {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const r = faker.random.number(10);
      const h = faker.finance.amount(0, 100, 1);
      const d = removeLines(faker.lorem.paragraphs());
      const ha = faker.random.number(1000);
      const f = faker.random.number(1000);
      const t = faker.random.number(50);
      const u_u = faker.internet.userName();
      const u_r = faker.random.boolean();
      const u_s = faker.random.boolean();
      const u_n = faker.random.number(500);
      const u_nr = faker.random.number(500);
      const u_i = faker.random.arrayElement(images);
      const u_p = faker.random.arrayElement(playerTypes);
      const u_x = faker.random.number(1000);
      const u_f = faker.random.number(50);
      const u_sl = faker.random.number(1000);
      const item = `${id}|${r}|${h}|${d}|${ha}|${f}|${t}|${u_u}|${u_r}|${u_s}|${u_n}|${u_nr}|${u_i}|${u_p}|${u_x}|${u_f}|${u_sl}\n`;
      if (i === 0) {
        fileFeeder.write(item, encoding, cb);
      } else {
        ok = fileFeeder.write(item, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      fileFeeder.once('drain', feed);
    }
  };
  feed();
};


buildTests(writeReviews, 'utf-8', () => {
  writeReviews.end();
});
