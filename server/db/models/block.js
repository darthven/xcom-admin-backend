import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BlockSchema = new Schema({
    title: { type: String, required: true },
    region: { type: String, required: false },
    store: { type: String, required: false },
    productIds: { type: Array, required: true },
    active: { type: Boolean, required: true },
})

export default mongoose.model('Block', BlockSchema)