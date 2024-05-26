import express from 'express';
import appRouter from './app_router.mjs';

const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use('/share-me/api', appRouter);

export default app;