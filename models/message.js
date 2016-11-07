'use strict';

const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    "content": { type : String},
    "timestamp": { type : Number}
});

mongoose.model('Message', messageSchema);
