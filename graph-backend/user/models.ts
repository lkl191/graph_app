import { model, Schema } from "mongoose";

const userSchema = new Schema({
  _id: String,
  username: String,
  password: String,
  email: String,
});

const User = model("User", userSchema);
export default User;
