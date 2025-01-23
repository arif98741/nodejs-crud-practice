import mongoose from "mongoose";

export const dbConnection = () => {

    mongoose.connect(process.env.MONGO_URI, {
        dbName: "hostpital_management_system"
    }).then(() => {
        console.log("Connected to database4");

    }).catch((err) => {
        console.log(`Some error occured while connecting to databse ${err}`)
    })

}