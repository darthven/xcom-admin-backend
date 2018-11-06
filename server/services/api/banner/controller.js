import fs from 'fs'

import Banner from './../../../db/models/banner'
import { IMAGE_DIR, IMAGE_URL } from './../../../config/env.config'
import logger from './../../../config/winston.config'

async function getBanner (ctx) {
    const { id } = ctx.params
    const banner = await Banner.findOne({ _id: id }) 
    if (banner) {
        ctx.response.body = banner
        ctx.status = 200
    } else {
        ctx.status = 404
    }
}

async function getBanners (ctx) {
    ctx.response.body = await Banner.find()
    ctx.status = 200   
}

async function getPublicBanners (ctx) {
    ctx.response.body = await Banner.find({ show: true })
    ctx.status = 200   
}

async function createBanner (ctx) {
    const banner = new Banner(ctx.request.body)
    await banner.save()
    ctx.body = banner
    ctx.status = 200 
}

async function uploadImage (ctx) {
    const { id } = ctx.params
    const image = ctx.request.files.file
    console.log('FIle', image.name,)
    const reader = fs.createReadStream(image.path)
    const writer = fs.createWriteStream(`${IMAGE_DIR}/${image.name}`)
    reader.pipe(writer);
    await Banner.updateOne({ _id: id }, {
        image: image.name
    })
    ctx.body = { url: `${IMAGE_URL}/${image.name}`}
    ctx.status = 200 
}

async function updateBanner (ctx) {
    const { id } = ctx.params
    const { title, body, startDate, endDate, productIds, show } = ctx.request.body
    await Banner.updateOne({ _id: id }, {
        title,
        body,
        startDate,
        endDate,
        productIds,
        show
    })
    ctx.body = {
        _id: id, 
        title,
        body,
        startDate,
        endDate,
        productIds,
        show
    }
    ctx.status = 200    
}

async function deleteBanner (ctx) {
    const { id } = ctx.params
    await Banner.deleteOne({ _id: id })
    ctx.body = id
    ctx.status = 200        
}

export default {
    getBanner,
    getBanners,
    getPublicBanners,
    createBanner,
    uploadImage,
    updateBanner,
    deleteBanner,
}