import { instance as razorpay } from '../../index.js';

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