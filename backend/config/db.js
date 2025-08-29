import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDb connected Successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
