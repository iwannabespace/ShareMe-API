import app from './app.mjs';
import env from './env/environment.mjs';
import db from './db/db.mjs';
import User from './db/models/user_model.mjs';

app.listen(env.PORT, () => console.log(`ShareMe Server started on port ${env.PORT}`));