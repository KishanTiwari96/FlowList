const express = require("express");
const jwt = require("jsonwebtoken")
const jwtPassword = "secret"
const { createTodo, updateTodo, deleteTodo } = require("./Zod");
const { todo, User } = require("./db")
const cors = require("cors");
const { authentication } = require("./Middleware");
const app = express();

app.use(express.json());
app.use(cors({
    origin:["https://to-do-project-henna.vercel.app"],
    methods : ["POST","GET","PUT","DELETE"],
    credentials : true
}));


app.post("/signup", async function(req,res){
    const{username,password} = req.body

    try{
        if (!username || !password){
            return res.status(400).json({
                error : "Username and Password are required"
            })
        }
        const existingUser = await User.findOne({username:username});

        if(existingUser){
            return res.status(411).json({
                msg:"Username already exists"
            })
        }
        await User.create({
            username,
            password
        })

        return res.json({
            msg : "User created successfully"
        })
    }catch(err){
        return res.status(500).json({
            msg : "Error in creating user"
        })
    }

})

app.post("/login", async(req,res) => {
    const {username,password} = req.body;
    try{
        if(!username || !password){
            return res.status(400).json({
                error : "Username and password are required"
            })
        }
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                error : "no such user found"
            })
        }
        if(user.password != password){
            return res.status(400).json({
                error : "Username or password incorrect"
            })
        }
        const  token = jwt.sign({userId : user._id},jwtPassword, {expiresIn:"30m"}) // the token becomes invalid after 30 mins
        
        return res.json({
            msg :"Login successfull",
            token
        })
    }catch(err){
        return res.status(400).json({
            error : "Some error occured"
        })
    }
})

app.post("/addTodo", authentication,async function(req,res) {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if(! parsePayload.success){
        res.status(411).json({
            msg : "You have sent the wrong input"
        });
        return;
    }
    await todo.create({
        title : createPayload.title,
        description : createPayload.description,
        userId : req.user.userId
    }).then((newTodo) =>{
        return res.json({
            msg : "Todo created",
            todo:newTodo
        })
    })

})

app.get("/todos",authentication, async function(req,res) {
    const todos = await todo.find({userId:req.user.userId});
    return res.json({
        todos
    })
})

app.put("/updateTodo",authentication,async function(req,res) {
    const title = req.body.title;

    const updatePayload = {
        title
    }
    const parsePayload = updateTodo.safeParse(updatePayload)

    if(! parsePayload.success){
        res.status(411).json({
            msg : "You have sent the wrong input"
        });
        return;
    }

    await todo.updateOne({title:title},{$set : {completed : true}});
    res.json({
        msg : "Todo marked as completed"
    })
})

app.delete("/deleteTodo", authentication,async(req,res)=>{
    
    const title = req.body.title;
    const payload = {
        title
    }
    const parsePayload = deleteTodo.safeParse(payload);

    if(!parsePayload.success){
        return res.status(400).json({
            msg : "Invalid title"
        })
    }
    await todo.deleteOne({title:title});
    res.json({
        msg : "Todo deleted"
    })
})

app.listen(3000);
