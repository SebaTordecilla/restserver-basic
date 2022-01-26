const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });
        console.log('Base de Datos conectada');

    } catch (error) {
        console.log(error);
        throw new Error('error al levantar base de datos');
    }

}

module.exports = {
    dbConnection
}