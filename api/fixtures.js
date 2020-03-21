const mongoose = require('mongoose');
const config = require('./config');
const Category = require('./model/Category');
const Goods = require('./model/Goods');

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [allItem ,computers, cars, other] = await Category.create({
    title: 'All Item',
    description: 'All goods'
  }, {
    title: 'Computers',
    description: 'Personal computers'
  }, {
    title: 'Cars',
    description: 'Transport'
  }, {
    title: 'Other',
    description: 'Other goods'
  });

  await Goods.create({
    title: 'Computers',
    price: 500,
    category: computers,
    image: 'fixtures/0QvFmccUCZJKF6KdTQTJZ.jpeg'
  }, {
    title: 'Cars',
    price: 60000,
    category: cars,
    image: 'fixtures/AQriiPdhRHUJrYDv8IqF3.jpg'
  }, {
    title: 'Other',
    price: 1000,
    category: other,
    image: 'fixtures/dYVfxPNxJPvZtn0CMtsDZ.jpg'
  });

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});