const mongoose = require('mongoose');


    const uri = 'mongodb+srv://todoappsinfo_db_user:Ibr%40r0328@robolox.b0heph2.mongodb.net/?appName=Robolox';


const connectdb = async()=>{
    try {
     await mongoose.connect(uri)
     console.log("Database connected on Atlas");

        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connectdb};