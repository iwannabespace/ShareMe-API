import dotenv from 'dotenv-safe';

dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    NM_HOST: process.env.NM_HOST,
    NM_PORT: process.env.NM_PORT,
    NM_USER: process.env.NM_USER,
    NM_PASS: process.env.NM_PASS
};