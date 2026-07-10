require("dotenv").config();
const { User } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { transporter } = require("../utils/nodemailer");
const { messageHandler } = require("../utils/messagehandler");
const { uploadToCloud } = require("../utils/cloudinary");


const registerHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username !== "" && email !== "" && password !== "") {
      const finduser = await User.findOne({ email });
      if (finduser) {
        return res.status(400).json({ message: "User Already Exist" });
      }
      const hashpass = await bcrypt.hash(password, 10);
      const createUser = await User.create({
        username,
        email,
        password: hashpass,
      });
      if (createUser) {
        return res
          .status(200)
          .json({ message: "User create Sucessfully", createUser });
      }
    } else {
      return res.status(400).json({ message: "Required all credentials " });
    }
  } catch (error) {
    return res.status(500).json({ message: `Server error ${error}` });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: " All Credentials Required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Exist" });
    }
    const passverify = await bcrypt.compare(password, user.password);
    if (passverify) {
      const userId = user._id;
      const secretkey = process.env.SECRETKEY;

      const token = jwt.sign({ userId }, secretkey);
      if (token) {
        // need to look into it , session in server?
        res.cookie("token", token, {
          maxAge: 100 * 60 * 60 * 24 * 30, //one month in milliseconds
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
      }
      return messageHandler(res, 200, "Logged in Sucessfully!", {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });

      // return res
      //   .status(200)
      //   .json({
      //     message: "User Login Sucessfully",
      //     token: token,
      //     userId: user._id,
      //   });
    } else {
      return res.status(400).json({ message: "Password Incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ message: `Server error ${error}` });
  }
};

const forgotPassHandler = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    const passwordResetLink = `http://localhost:4000/user/password/reset/${user._id}`;

    const mailOptions = {
      from: "todoapps.info@gmail.com",
      to: email,
      subject: "Password Reset Link",
      text: passwordResetLink,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: ", info.response);

    return res.status(200).json({
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    console.error("Mail error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const resetPassHandler = async (req, res) => {
  try {
    const { newPass, confirmPass } = req.body;
    const { userId } = req.params; // params wo hai jo "/" kai bad type kia jata hai
    console.log(userId);

    if (newPass !== confirmPass) {
      return res.status(400).json({ message: "Password Does Not Match" });
    }

    debugger;
    const hashpass = await bcrypt.hash(newPass, 10);
    const updatePass = await User.findByIdAndUpdate(userId, {
      password: hashpass,
    });

    if (updatePass) {
      return res.status(200).json({ message: "Password Changed Succesfully" });
    } else {
      res
        .status(500)
        .json({ message: "Some Error. Kindly try again after sometimes" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};
const getUser = async (req, res) => {
  try {
    const UserId = req.params.userId;

    if (!UserId) {
      return res.status(404).json({ message: "Id Not Found" });
    }
    const user = await User.findById(UserId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ message: "User Found", user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};
const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(404).json({ message: "Users not Found " });
    }

    return res
      .status(200)
      .json({ message: `User : ${user.length} Found`, user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};
const deleteHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(404).json({ message: "Id Not Found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const deleteUser = await User.findByIdAndDelete(userId);
    if (deleteUser) {
      return res.status(200).json({ message: "User Deleted" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateHandler = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return messageHandler(res, 404, "User Not Found");
    }
    if (username) {
      user.username = username;
    }

    if (password) {
      const hashpass = await bcrypt.hash(password, 10);
      user.password = hashpass;
    }
    if (role) {
      user.role = role;
    }

    const Update = await user.save();
    // return messageHandler(res, 200, "User Updated", Update);
    return messageHandler(res, 200, "User Updated", {
      _id: Update._id,
      username: Update.username,
      email: Update.email,
      password: Update.password,
      role: Update.role,
    });
  } catch (error) {
    return messageHandler(res, 500, "Server Error", error);
  }
};

const uploadProfilePic = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return messageHandler(res, 404, "User Not Found");
    }
    const imagePath = req.file.path;
    if (!req.file) {
      return messageHandler(res, 400, "File is not Upload");
    }

    const upload = await uploadToCloud(imagePath);
    // console.log(upload)
    if (upload) {
      user.profilePicUrl = user.secure_url;
      await user.save();

      return messageHandler(res, 200, "Profile is uploaded", upload);
    }
  } catch (error) {
    return messageHandler(res, 500, "Server Error", error);
  }
};

module.exports = {
  registerHandler,
  loginHandler,
  forgotPassHandler,
  resetPassHandler,
  getUser,
  getAllUser,
  deleteHandler,
  updateHandler,
  uploadProfilePic,
};
