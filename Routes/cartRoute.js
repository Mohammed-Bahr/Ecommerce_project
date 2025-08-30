import express from 'express';
import { getActiveCardForUser } from '../Services/cartService.js';
import validateJWT from '../validation/validateJWT.js';

const router = express.Router();

router.get('/', validateJWT , async (req , res) => {
    try {
        const userID = req.user._id;
        const cart = await getActiveCardForUser({userID});
        res.status(200).send(cart);
    } catch (error) {
        console.error('Cart route error:', error);
        res.status(500).send({
            success: false,
            message: 'Failed to get cart',
            error: error.message
        });
    }
}) 




export default router;