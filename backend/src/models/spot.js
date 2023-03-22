import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SpotSchema = Schema({
    Name: { type: String, required: true },
    Id: { type: String},
    Toldescribe: { type: String},
    Tel: {type: String},
    Add: {type: String},
    Region: {type: String},
    Town: {type: String},
    Travellinginfo: {type: String},
    Opentime: {type: String},
    Picture1: {type: String},
    Px: {type: String},
    Py: {type: String},
    Class1: {type: String},
    Class2: {type: String},
    Class3: {type: String},
    Website: {type: String},
    class_result: {type: Array},
}, {
    collection: 'Spot',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('Spot', SpotSchema)

export default exportSchema
