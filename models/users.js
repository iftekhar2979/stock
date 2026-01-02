import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  isBlocked: { type: Boolean, default: false },
}, { timestamps: true });

// Export as User (singular) to match standard conventions
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;