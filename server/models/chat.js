import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        prompt:{
            type:String,
            required:true,
         },
         response:{
            type:String,
            required:true,
         }

    },
    { timestamps:true }
);
export default mongoose.model("Chat",chatSchema);