const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        // require: true, 
    },
    email:{
        type:String,
        // require:true,
    },

    password: {
        type : String
    }, 
    profilePicUrl:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:false
    },
  location: { latitude: String, longitude: String },
  order:[],
  services:[],
  role:{
    type:String,
    enum:["admin","customer","service provider"],
    default:"customer"
  },
  review:[{
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = {User};