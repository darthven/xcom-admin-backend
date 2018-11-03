import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BannerSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    productIds: { type: Array, required: true },
    show: { type: Boolean, required: true }
})

export default mongoose.model('Banner', BannerSchema)