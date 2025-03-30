const express = require('express')

const app = express();
const PORT = 5050;
//middlewares


//routes
app.get("/test", (req,res) =>{
    res.status(200).send("<h1>Grocery App</h1>");
});

//listen
app.listen(PORT, ()=>{
    console.log(`Server is Running at port : ${PORT}`);
})