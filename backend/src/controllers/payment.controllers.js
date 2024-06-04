import { instance as razorpay } from '../../index.js';
import Stripe from 'stripe'
const stripe = Stripe('sk_test_51PKx14SIhQBv3dCOfuuhuAj4ELvCUzrfjowRCaMhTpZaIa7HBoWjE7vyGVk24vs5AsXlBt7COwqAtXhJWBbSwrsz00lKR6RUHP');

export const checkout = async (req, res) => {
    try {
        var options = {
            amount: 50000,  // amount in the smallest currency unit
            currency: "INR",
            // receipt: "order_rcptid_11"
        };
        const order = await razorpay.orders.create(options)

        console.log("order ", order);
        return res.status(200).json({ success: 201, message: "order successfully created!" })
    } catch (error) {
        console.log("Error while creating order : ", error);
    }
}

export const createPaymentOIntent = async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'inr',
            // payment_method_types: ['UPI'], // Specify UPI as the payment method
            automatic_payment_methods: {
                enabled: true,
            },
        });
        console.log("paymentIntent : ", paymentIntent);
        res.send({
            paymentIntent: paymentIntent,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}