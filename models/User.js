import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    cpf: {
        type: String,
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    birthdate: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default model('User', userSchema);
