import request from 'request-promise-native'

import Block from './../../../db/models/block'
import { XCOM_URL } from '../../../config/env.config';

async function getBlock (ctx) {
    const { id } = ctx.params
    const block = await Block.findOne({ _id: id }) 
    if (block) {
        ctx.response.body = block._doc
        ctx.status = 200
    } else {
        ctx.status = 404
    }
}

async function getBlocks (ctx) {
    ctx.response.body = (await Block.find()).map(bl => bl._doc)
    ctx.status = 200   
}

async function getBlocksByRegionWithProducts (ctx) {
    const result = (await Block.find({ regionId: ctx.query.regionId })).map(bl => bl._doc)
    for (const [index, doc] of result.entries()) {
        const products = await request.get(`${XCOM_URL}/goods/by/ids/?ids=${doc.productIds.toString()}&region=${ctx.query.regionId}`)
        result[index].products = JSON.parse(products)
    }
    ctx.response.body = result
    ctx.status = 200   
}

async function createBlock (ctx) {
    const block = new Block(ctx.request.body)
    await block.save()
    ctx.body = block
    ctx.status = 200 
}

async function updateBlock (ctx) {
    const { id } = ctx.params
    const { title, regionId, storeId, productIds, active } = ctx.request.body
    await Block.updateOne({ _id: id }, {
        title,
        regionId,
        storeId,
        productIds,
        active
    })
    ctx.body = new Block({
        _id: id, 
        title,
        regionId,
        storeId,
        productIds,
        active
    })
    ctx.status = 200    
}

async function deleteBlock (ctx) {
    const { id } = ctx.params
    await Block.deleteOne({ _id: id })
    ctx.body = id
    ctx.status = 200        
}

export default {
    getBlock,
    getBlocks,
    getBlocksByRegionWithProducts,
    createBlock,
    updateBlock,
    deleteBlock
}