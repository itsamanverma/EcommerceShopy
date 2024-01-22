import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  try {
    const connectionUrl =
      "mongodb+srv://amanvermame786:123456782023@cluster0.8ydapbq.mongodb.net/";

    mongoose
      .connect(connectionUrl, configOptions)
      .then(() =>
        console.log("EcommerceShopy database connected successfully!")
      )
      .catch((err) =>
        console.log(`Getting Error from DB connection ${err.message}`)
      );
  } catch (error) {
    throw error;
  }
};

export default connectToDB;
