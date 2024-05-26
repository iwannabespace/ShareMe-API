import express from 'express';
import login from './routes/login.mjs';
import register from './routes/register.mjs';
import verify from './routes/verify.mjs';

const router = express.Router();

router.use('/login', login);
router.use('/register', register);
router.use('/verify', verify);

export default router;