import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();
const DB_URI = process.env.DB_URI;

const connectDB = async () => {
    await connect(DB_URI)
        .then(() => console.log('Conectado com sucesso'))
        .catch((e) => 'Erro ao conectar: ' + e);
};

export default connectDB;
