import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Prevents "Cannot overwrite model" error during hot reload
export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
