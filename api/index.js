// Use "type: module" in package.json to use ES modules
const express = require('express')
const sharp = require("sharp")
const { createCanvas, registerFont } = require('canvas');
require('dotenv').config()



const app = express();
 
// Define your routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

app.get('/home', (req, res) => {
  res.send("welcome home.");
});

//the path is appendix to the root dir vercelNew
//registerFont('fonts/Cairo-Regular.ttf', { family: 'Cairo, Regular' });


app.get("/test", (req, res) => {

    res.setHeader('Content-Disposition', 'attachment; filename="image.png"');  //the name of image file
    res.setHeader('Content-Type', 'image/png'); // Set response type



    const canvas = createCanvas(736, 1104)
    const ctx = canvas.getContext('2d')

    ctx.font = 'bold 80px "Cairo, Regular" '
    ctx.fillStyle = '#f9d697'; 
    ctx.textAlign = 'center';
    ctx.fillText("العالم الجديد", canvas.width / 2, 280)
    //ctx.font = '40px "Cairo, Regular" '
    ctx.fillText("العالم الجديد", canvas.width / 2, 580)
    
        
    
    sharp(canvas.toBuffer('image/png'))
    .png()
    .pipe(res)





})
 
// Export the Express app
//export default app;


app.listen( 3000 , () => {
  console.log ("server is ready")
})



