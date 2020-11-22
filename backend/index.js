const express  = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser)

const PORT = process.env.PORT || 5000

app.listen(PORT , () => console.log(`server has started on port: ${PORT}`));

// set up mongoose

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, 
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex: true,
    },
    (err) => {
        if(err) throw err;
        console.log("connection established");
    }
);

// set routes

app.use("/users", require("./routes/userRouter"));
app.use("/todos", require("./routes/todoRouter"));