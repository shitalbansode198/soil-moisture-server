const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
    {
        id: {
            type: String
        },
        value: {
            type: Number,
            default: 50
        }
    }
)

const Data = mongoose.model("Data", DataSchema);

module.exports = {
    Data : Data
}