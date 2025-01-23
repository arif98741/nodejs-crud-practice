import mongoose from "mongoose";

export const dbConnection = () => {

    console.log('Connection uri'+process.env.MONGO_URI)
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "hostpital_management_system"
    }).then(() => {
        console.log("Connected to database");

    }).catch((err) => {
        console.log(`Some error occured while connecting to databse ${err}`)
    })

}