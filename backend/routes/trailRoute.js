import express from 'express'
import { trailStripePayment,order,verify} from '../controllers/trail.js'

const trailRouter = express.Router()

trailRouter.post('/stripe',trailStripePayment)
trailRouter.post('/razor/order',order)
trailRouter.post('/razor/verify',verify)

export default trailRouter