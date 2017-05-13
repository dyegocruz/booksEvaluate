import mongoose, { Schema } from 'mongoose';
import validator from 'mongoose-validator';
import Book from './book';
import User from './user';

let maxlengthDescription = [256, 'A descrição deve conter no máximo {MAXLENGTH} caracteres.'];

const evaluateSchema = new Schema({
    state: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    description: {
        type: String,
        maxlength: maxlengthDescription
    },
    book: { 
        type: Schema.Types.ObjectId, 
        ref: 'Book',
        required: true 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
     },
});

module.exports = mongoose.model('Evaluate', evaluateSchema);