import express from "express"
import morgan from "morgan"
import paymentRouter from './routes/payment.routes.js'
import {PORT} from './config.js'
import path from 'path'

const app = express()

app.use(morgan('dev'))

app.use(paymentRouter)

app.use(express.static(path.resolve('src/public')))

app.listen(PORT)
console.log('server up on port',  PORT)