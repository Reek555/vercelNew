const express = require('express'); 
const app = express();



app.use(express.json()); 


app.get('/home', (req, res) => {
    res.send("welcom to home page!")
})



app.listen(process.env.PORT || "3000", () =>{console.log ('server is running')})

