import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SpotDistanceSchema = Schema({
    Id: {type: String, required: true },
    distance: {type: Schema.Types.Decimal128},
}, {
    collection: 'SpotDistance',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const DistanceSchema = mongoose.model('SpotDistance', SpotDistanceSchema)

export default DistanceSchema