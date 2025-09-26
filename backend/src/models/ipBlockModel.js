import mongoose from "mongoose";

const ipBlockSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  reason: { type: String, default: "Guest upload limit reached" },
  type: {
    type: String,
    enum: ["upload", "generate"],
    required: true
  },
  blockedAt: { type: Date, default: Date.now }
}, { timestamps: true });

ipBlockSchema.index({ ip: 1, type: 1 }, { unique: true });

const IpBlock = mongoose.model("IpBlock", ipBlockSchema);
export default IpBlock;