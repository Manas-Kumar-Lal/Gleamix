import mongoose from "mongoose"

((async()=>{
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connection Build :: Host : ", connectionInstance.connection.host)
})())