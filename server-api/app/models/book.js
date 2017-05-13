import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    publication_year: {
        type: String,
        required: true
    },
    edition: {
        type: Number,
        default: 1
    },
    entry_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    code: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Book', bookSchema);