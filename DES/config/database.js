const mongoose=require('mongoose')
require('dotenv').config()

exports.ConnectDB= async () => {
    try{
        await mongoose.connect(process.env.MONOGODB_URL)
        console.log('Connected to DB')

    } catch (err) {

        console.error(err)
        console.log('Problem in connecting with DB')
        process.exit(1)
    }
    
}