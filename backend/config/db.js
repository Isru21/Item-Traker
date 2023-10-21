const mongoose = require ('mongoose')


const connectDB = async () => {
   
    try {
        // console.log(process.env.MONGO_DB)
        const conn = await mongoose.connect(process.env.MONGO_DB1)

        console.log(`mongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}

module.exports = connectDB