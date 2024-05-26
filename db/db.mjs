import mongoose from "mongoose";
import env from "../env/environment.mjs";

const db = await mongoose.connect(env.MONGODB_URI);

export default db;