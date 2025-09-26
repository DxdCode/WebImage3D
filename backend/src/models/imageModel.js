import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true },

  url_model: { type: String },
  public_model_id: { type: String },
  task_id: { type: String },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  meta: {
    ip: { type: String },
  }
}, { timestamps: true });

const Image = mongoose.model("Image", imageSchema);
export default Image;
