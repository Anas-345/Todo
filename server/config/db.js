import mongoose from "mongoose";

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_NAME } = process.env

async function connectDB() {
    try {
        await mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.vha0gtj.mongodb.net/?appName=Cluster0`,
            { dbName: MONGODB_NAME })
        console.log('DB connected')
    } catch (error) {
        console.log('DB not connected')
        console.log('error', error)
    }
}

export { connectDB }
