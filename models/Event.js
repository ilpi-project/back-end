import { model, Schema } from 'mongoose';

const eventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        maxLength: 250,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

export default model('Event', eventSchema);
