const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Database Online')
    } catch (error) {
        throw new Error('error connecting to database' + error.message)
    }
}

module.exports = {dbConnection}
