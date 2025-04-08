import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    title: String,
    key: String,
}, { timestamps: true });

export default mongoose.model("Image", imageSchema);