import { model, Schema } from 'mongoose';

const memberSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
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
        unique: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    healthInsurance: {
        type: String,
        default: '',
    },
    medicalConditions: {
        type: [String],
        default: [],
    },
});

export default model('Member', memberSchema);
