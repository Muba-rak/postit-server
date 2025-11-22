require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
mongoose.set("strictQuery", true);
const auth = require("./middleware/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const User = require("./models/user");
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_api_secret,
});
//middleware
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(cors());

//routes
app.get((req, res)=>{
  res.status(200).json({message: "Post It Server" });
})
app.use("/api/v1", userRouter);
app.get("/api/v1/user", auth, async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  res.status(200).json({ name: user.name });
});
app.use("/api/v1", auth, postRouter);

app.use((req, res) => {
  res.send('route not found')
})
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`app listening on ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
