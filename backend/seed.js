import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './users.js';
import products from './products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Deleting existing data from collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Inserting user data into the database
    const createdUsers = await User.insertMany(users);

    // Extracting admin user ID
    const adminUser = createdUsers[0]._id;

    // Adding admin user ID to each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Inserting sample product data into the database
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
