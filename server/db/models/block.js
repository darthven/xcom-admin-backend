import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BlockSchema = new Schema({
    title: { type: String, required: true },
    regionId: { type: Number, required: false },
    storeId: { type: Number, required: false },
    productIds: { type: Array, required: true },
    active: { type: Boolean, required: true },
})

export default mongoose.model('Block', BlockSchema)