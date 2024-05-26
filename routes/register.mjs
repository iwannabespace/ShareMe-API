import express from 'express';
import crypto from 'node:crypto';
import User from '../db/models/user_model.mjs';
import VerificationCode from '../db/models/verification_code_model.mjs';
import Mailer from '../utils/mail/mailer.mjs';
import Validator from '../middlewares/validator.mjs';
import { registerSchema } from '../utils/joi/schemas.mjs';

const router = express.Router();
router.use(Validator.validate(registerSchema));

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        const user = new User(req.body);

        const userExists = await User.findOne({ email });
        if (userExists) { 
            res.status(400).json({
                error: 'user_exists',
                message: 'User already exists!' 
            });
        } else {
            const code = crypto.randomBytes(3).toString('hex').toUpperCase();
            const verificationCode = new VerificationCode({ userId: user._id, code: code });

            await user.save();
            await verificationCode.save();

            const mailer = new Mailer();
            const info = await mailer.sendVerification(email, 'ShareMe - Account Verification', code);

            if (info.accepted.length) {
                res.status(201).json({ message: 'User created successfully!' });
            } else {
                res.status(404).json({ 
                    error: 'invalid_mail',
                    message: 'Please enter a valid email!' 
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ 
            error: 'server_error',
            message: 'Something went wrong!' 
        });
    }
});

export default router;