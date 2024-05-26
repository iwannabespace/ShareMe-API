import express from 'express';
import VerificationCode from '../db/models/verification_code_model.mjs';
import User from '../db/models/user_model.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { code } = req.body;
        const verificationCode = await VerificationCode.findOne({ code: code });
        
        if (!verificationCode) {
            res.status(404).json({ error: 'verification_error', message: 'Verification code not found!' });
        } else {
            const user = await User.findById(verificationCode.userId);
            if (!user) {
                res.status(404).json({ error: 'user_not_found', message: 'User not found!' });
            } else {
                user.active = true;
                await user.save();
                await VerificationCode.deleteOne({ userId: verificationCode.userId });
                res.status(200).json({ message: 'User activated!' });
            }
        }
    } catch (err) {
        res.status(500).json({ error: 'server_error', message: 'Something went wrong!' });
    }
});

export default router;