import mongoose from "mongoose";

const cnnectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Mongoose is connected');
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/GreenCart`);
    } catch (error) {
        console.error(error.message);
    }
};

export default cnnectDB