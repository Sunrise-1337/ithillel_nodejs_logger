import express from 'express'
import itemsRouter from './routing/items/items.routing.js'

const APP_PORT = 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/items', itemsRouter)

app.listen(APP_PORT, () => console.log(`Server started on ${APP_PORT} port`))