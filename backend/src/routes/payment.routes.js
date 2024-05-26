import express, { Router } from 'express'
import { checkout } from '../controllers/payment.controllers.js';

const router = Router()

router.route("/checkout").post(checkout)

export default router;