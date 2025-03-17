require('dotenv').config();
const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

const connectDB = async () => {
    await mongoose
        .connect(DB_URI)
        .then(() => console.log('Conectado com sucesso'))
        .catch((e) => 'Erro ao conectar: ' + e);
};

module.exports = connectDB;
