const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.BD_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB conectada')
    } catch (error) {
        console.log(error);
        process.exit(1); // Detener la APP
    }
}

module.exports = connectDB;