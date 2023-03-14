import mongoose from 'mongoose';

// const dbUrl = `mongodb://${config.get('databaseName')}:${config.get('databasePassword')}@localhost:27017/jwtAuth?authSource=admin`;

const dbUrl = `mongodb://127.0.0.1:27017/${process.env.MONGODB_DATABASE_NAME}`;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log('MongoDB database connected...');
    } catch (error: any) {
        console.error(error);
        setTimeout(connectDB, 5000);
    }
};

mongoose.set('strictQuery', false)

export default connectDB;
