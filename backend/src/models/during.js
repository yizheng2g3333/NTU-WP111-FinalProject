import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SpotDuringSchema = Schema({
    Id: {type: String, required: true },
    during: {type: Schema.Types.Decimal128},
}, {
    collection: 'SpotDuring',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const DuringSchema = mongoose.model('SpotDuring', SpotDuringSchema)

export default DuringSchema