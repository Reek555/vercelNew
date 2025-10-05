// Use "type: module" in package.json to use ES modules
const express = require('express')
const sharp = require("sharp")
const { createCanvas, registerFont } = require('canvas');
require('dotenv').config()


//the path is appendix to the root dir vercelNew
registerFont('fonts/Cairo-Regular.ttf', { family: 'Cairo, Regular' });
registerFont('fonts/ReemKufi-Regular.ttf', { family: 'Reem Kufi, Regular' });


const app = express();

//serving public files;
app.use(express.static('public'))

 
// Define your routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});




app.get('/home', (req, res) => {
  res.send("welcome home.");
});



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



app.get('/aid', (req, res) => {

    let recipient = req.query.recipient
    let sender = `.سلامي...، ${req.query.sender}`

    if ( recipient.length == 0 || sender.length == 0) {
        console.log(recipient, sender)
        console.log('validation error')
        return res.end()
    } 





    res.setHeader('Content-Disposition', 'attachment; filename="image.png"');  //the name of image file
    res.setHeader('Content-Type', 'image/png'); // Set response type


    const canvas = createCanvas(626, 527)
    const ctx = canvas.getContext('2d')

    ctx.font = '40px "Reem Kufi, Regular"'
    ctx.fillStyle = '#f9d697'; 
    ctx.textAlign = 'center';
    ctx.fillText(recipient, 450 , 220)


    ctx.font = '22px "Reem Kufi, Regular"'
    ctx.fillStyle = '#ffffff'; 
    ctx.textAlign = 'right';
    ctx.fillText(sender, 585 , 380)

            
    
    sharp('template/aid-template.jpg')
    .composite([ 
        {input: canvas.toBuffer('image/png'), top: 0, left: 0}, 
    ], 
    )
    .png()
    .pipe(res)
  
  
  })







 
// Export the Express app
//export default app;


app.listen( 3000 , () => {
  console.log ("server is ready")
})



