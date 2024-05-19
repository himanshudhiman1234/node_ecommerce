const mongoose = require("mongoose");

const bookformSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const BookForm = mongoose.model("BookForm", bookformSchema);

module.exports = BookForm ; // Exporting as an object with the key BookForm
