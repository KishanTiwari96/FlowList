const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://kishantiwari698591:boP1dZ1EKhmDY5nf@cluster0.ckpsh.mongodb.net/Project-Todo");

const todoSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String, required:true},
    completed:{type:Boolean,default : false},
    userId : {type:mongoose.Schema.Types.ObjectId, ref :"User", required:true}
})

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    todos: {type:mongoose.Schema.Types.ObjectId, ref :"todo"}
})

const todo = mongoose.model('todo',todoSchema); 
const User = mongoose.model('User',userSchema);

module.exports = {
    todo,
    User
}