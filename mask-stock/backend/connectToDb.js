const mongoose = require('mongoose')

const connectToDb = (dbName) => {
    mongoose
        .set('strictQuery', false)
        .connect(`mongodb://127.0.0.1:27017/mask-stock`)
        .catch((error) => console.error(error))
        .then((r) => console.log(`Connected to DB: ${r.connection.name}`));
};

module.exports = connectToDb