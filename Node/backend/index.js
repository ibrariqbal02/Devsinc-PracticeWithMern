require("dotenv").config();
const express = require("express");
const { connectdb } = require("./config/conn");
const cors = require("cors");
PORT = process.env.PORT;
const {
  registerHandlder,
  registerHandler,
  loginHandler,
  forgotPassHandler,
  resetPassHandler,
  getUser,
  getAllUser,
  deleteHandler,
  updateHandler,
  uploadProfilePic,
} = require("./controller/UserController");
const { mulmid } = require("./middleware/multer");

const app = express();

// middle ware

app.use(express.json());

app.use(
  cors({
    // origin: "http://localhost:3000",
    // credentials: true,
  })
);
connectdb();

// Routes
app.post("/user/register", registerHandler);
app.post("/user/login", loginHandler);
app.post("/user/forgotPass", forgotPassHandler);
app.post("/user/password/reset/:userId", resetPassHandler);
app.get("/user/:userId", getUser);
app.delete("/user/delete/:userId", deleteHandler);
app.get("/getAllUser", getAllUser);
app.put("/user/update", updateHandler);
app.post("/user/upload/:userId", mulmid, uploadProfilePic);

app.listen(PORT || 4000, () => {
  console.log(`Server is Listing on Port ${PORT}`);
});
