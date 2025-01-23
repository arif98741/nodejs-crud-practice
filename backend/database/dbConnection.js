import mongoose from "mongoose";

export const dbConnection = () => {

    mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.MONGO_DATABASE
    }).then((e) => {

        console.log(`Connected to database "${process.env.MONGO_DATABASE}"`);

    }).catch((err) => {
        console.log(`Some error occured while connecting to databse ${err}`)
    })

}