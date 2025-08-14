const mongoose=require("mongoose")
require("dotenv").config({path:"./config/.env"})

exports.db=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL1)
        console.log("connexion reussi avec sucée")
    }catch{
        console.log("echec de connexion")
    }

}
