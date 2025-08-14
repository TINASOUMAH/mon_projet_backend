const mongoose=require("mongoose")

const modeltache=new mongoose.Schema({
    titre:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["à faire","en cours","terminé"],
        default:"à faire"
    },
    priority: { type: String, 
        enum: ['basse', 'moyenne', 'haute'],
         default: 'moyenne' },
         assigneA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Membre',
      required: false
  },

    
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"taches",
        required:false
    },
    assignedto:{
        
    }


},{timestamps:true})
module.exports=mongoose.model("taches",modeltache)