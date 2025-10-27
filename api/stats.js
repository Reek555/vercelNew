const mongoose = require("mongoose"); 
require("dotenv").config()


//mongoose.connect('mongodb://127.0.0.1:27017/test');
//mongoose.connect("mongodb+srv://rickswass:9bpClcBDMyAqHbVp@cluster0.1zeidif.mongodb.net/test")
//mongoose.connect('mongodb://127.0.0.1:27017/test');
//"mongodb+srv://rickswass:9bpClcBDMyAqHbVp@cluster0.1zeidif.mongodb.net/?appName=Cluster0/greetingCard"


const statsSchema = new mongoose.Schema({
    views: {
        type: Number, 
    }

})


const Stats = mongoose.model("stats", statsSchema)


async function main () {

    await mongoose.connect(process.env.DB);
    // let stat  = new Stats({views: 0})
    // await stat.save(); 
    // console.log(1)

}





main().catch(err => console.log(err));




module.exports = Stats; 