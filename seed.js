import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './users.js';
import products from './src/products.js';
import User from './models/user.js';
import Product from './models/product.js';
import Order from './models/order.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    //will return my object with my user id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // insert my data to the database
    await Product.insertMany(sampleProducts);
    console.log('Data ready to be used!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
