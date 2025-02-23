import express from 'express'

import {getAllItems, addItemToList, toToggleStatusOfItem, toDeleteItem, isThereSuchItem} from '../../services/items.service.js'

const itemsRouter = express.Router()

itemsRouter
    .get('', (req, res) => {
        res.statusCode = 200

        res.send(getAllItems())
    })
    .post('', (req, res) => {
        addItemToList(req.body.item)

        res.statusCode = 200

        res.json({status: 'SUCCESS'})
    })

    
itemsRouter
    .put('/:itemId', (req, res) => {
        const id = req.params['itemId']

        if (isThereSuchItem(id)) {
            const item = toToggleStatusOfItem(id)
    
            res.statusCode = 200
    
            res.json({item})
        } else {
            toDealWithElementNotFound(res)
        }
    })
    .delete('/:itemId', (req, res) => {
        const id = req.params['itemId']
        
        if (isThereSuchItem(id)) {
            const itemsLeft = toDeleteItem(id)
    
            res.statusCode = 200
    
            res.json({itemsList: itemsLeft})
        } else {
            toDealWithElementNotFound(res)
        }
    })

const toDealWithElementNotFound = (res) => {
    res.statusCode = 404
    
    res.json({status: 'FAIL'})
}

export default itemsRouter