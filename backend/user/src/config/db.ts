import mongoose from "mongoose"

const connectDb = async() => {
    const url = process.env.MONGO_URI

    if(!url){
        throw new Error("MongoURI is not defined")
    }
    try {
        await mongoose.connect(url , {
            dbName : "BaatCheetmicroservices"
        });
        console.log("MongoDb connected successfully")
        
    } catch (error) {
        console.log("MongoDb connection failed")
        process.exit(1)
    }
}

export default connectDb