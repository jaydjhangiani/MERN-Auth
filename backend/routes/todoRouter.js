const router = require("express").Router();
const Todo = require("../models/todoModel");
const auth = require("../middleware/auth")

router.post("/",auth,  async (req,res)=>{
    try{
       
        const{title} = req.body;

        if(!title){
            return res.status(400).json({msg:"no input"});
        }

        const newTodo = new Todo({
            title,
            userId: req.user
        });

        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
})

router.get("/all",auth, async (req,res)=>{
    const todos = await Todo.find({userId: req.user});
    res.json(todos)
})

router.delete("/:id",auth, async(req,res) => {
    //console.log(req.user,req.params.id)
    const todo = await Todo.findOne({userId: req.user, _id:req.params.id})
    if (!todo){
        return res.status(400).json({msg: "lol u mad"});
    }

    const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
    res.json(deleteTodo)
})


module.exports = router;