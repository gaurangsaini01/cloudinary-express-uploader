const express = require("express");
const app = express();
const router = require("./routes/routes.js");
const fileUpload = require("express-fileupload");
require("dotenv").config();

//to parse req.body
app.use(express.json());
//for media storage on our server
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//database connection
const connectWithDb = require("./config/database.js");
connectWithDb();
//cloudinary connection for media storage on Cloud
const cloudinaryConnect = require("./config/cloudinary.js");
cloudinaryConnect();

//mounting routes
app.use("/api/v1/upload", router);

app.listen(process.env.PORT, () => {
  console.log(`App started at port ${process.env.PORT}`);
});
app.get("/", (req, res) => {
  res.send("<h1>Home Page hai bhai</h1>");
});
