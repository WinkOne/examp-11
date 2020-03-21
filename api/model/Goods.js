const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GoodsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: String,

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const Goods = mongoose.model('Goods', GoodsSchema);

module.exports = Goods;