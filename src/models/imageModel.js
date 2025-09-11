import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },            
  public_id: { type: String, required: true },     
  url_model: { type: String },                     
  public_model_id: { type: String },                 
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
