const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    typed: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },
    cpm:{
        type: Number,
        required: true
    },
    error:{
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Results = mongoose.model('Results', resultsSchema);

module.exports = Results;
