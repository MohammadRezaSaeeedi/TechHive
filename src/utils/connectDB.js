import mongoose from "mongoose";
function connectDB() {
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DATABASE_URL);
  console.log("Connected to DB");
}

export default connectDB;
