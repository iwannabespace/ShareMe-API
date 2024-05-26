import express from 'express';
import User from '../db/models/user_model.mjs';
import Validator from '../middlewares/validator.mjs';
import { loginSchema } from '../utils/joi/schemas.mjs';

const router = express.Router();
router.use(Validator.validate(loginSchema));

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) { 
            if (user.password === password) {
                console.log(user._id);
                console.log(user._id.toString());
                if (user.active) {
                    res.json({ 
                        userId: user._id.toString(),
                        message: 'Login successful!',
                    });
                } else {
                    res.status(400).json({
                        error: 'user_not_active',
                        message: 'User is not active!'
                    });
                }
            } else {
                res.status(400).json({
                    error: 'invalid_credentials',
                    message: 'Invalid credentials!'
                });
            }
        } else {
            res.status(404).json({
                error: 'user_not_found',
                message: 'User not found!' 
            });
        }
    } catch (err) {
        res.status(500).json({ 
            error: 'server_error',
            message: 'Something went wrong!' 
        });
    }
});

export default router;