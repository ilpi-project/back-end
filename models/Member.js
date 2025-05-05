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
    emergencyNumber: {
        type: String,
        required: true,
    },
    medicalConditions: {
        type: [String],
        default: [],
    },
});

export default model('Member', memberSchema);
