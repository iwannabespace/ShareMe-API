import mongoose from "mongoose";

const verificationCodeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

export default mongoose.model('codes', verificationCodeSchema);