import fs from 'fs'

import Banner from './../../../db/models/banner'
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
    const { image } = ctx.request.body
    console.log('BODY', ctx.request.body)
    fs.writeFileSync(`${__dirname}/images`, image)
    await Banner.updateOne({ _id: id }, {
        image: image.filename
    })
    ctx.body = { url: `${__dirname}/images/${image.name}` }
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