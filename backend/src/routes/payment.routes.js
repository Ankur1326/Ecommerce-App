import express, { Router } from 'express'
import { checkout, createPaymentOIntent } from '../controllers/payment.controllers.js';

const router = Router()

router.route("/checkout").post(checkout)
router.route('/intents').post(createPaymentOIntent)

export default router;