// Use "type: module" in package.json to use ES modules
const express = require('express')
const { createCanvas, registerFont, loadImage} = require('canvas');
require('dotenv').config()
const Stats = require("./stats")
const path = require("path")



//the path is appendix to the root dir vercelNew
registerFont('included/fonts/ReemKufi-Regular.ttf', { family: 'Reem Kufi, Regular' });
registerFont('included/fonts/Cairo-Bold.ttf', { family: 'Cairo, Bold' });
registerFont('included/fonts/Cairo-Regular.ttf', { family: 'Cairo, Regular' });


const app = express();




app.get("/test", (req, res) => {

})



app.get('/goodDay.html', async (req, res) => {

    res.sendFile(path.join(process.cwd(), "public/goodDay.html"))

    let stats =  await Stats.find({}); 
    let newViews = stats[0].views + 1; 
    await Stats.updateOne({views: newViews})



})



//serving public files;
app.use(express.static('public'))

 
// Define your routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});




app.get('/home', (req, res) => {
  res.send("welcome home.");
});








app.get('/goodDay', (req, res) => {



    let recipient = req.query.recipient
    let signature = req.query.signature
    let sentence = req.query.sentence

    

    // data validation
    if ( recipient.length == 0 || signature.length == 0) {
        console.log(recipient, signature)
        console.log('validation error')
        return res.end()
    } 



    const canvas = createCanvas(736, 944) // demnsions of the template; 
    const ctx = canvas.getContext('2d')


    loadImage('included/template/template-card.jpg').then((image) => {
      ctx.drawImage(image, 0,0)
      ctx.textAlign = 'center';


      //date
      let date = new Date(); 
      let day = date.getDate(); 
      let month = date.getMonth() + 1; 
      let year= date.getFullYear(); 
      stringDate = `${day}/${month}/${year}`
      let fontSize = 28; 
      ctx.font = `${fontSize}px "Cairo, Regular" `
      ctx.fillStyle = '#000000ff'; 
      ctx.fillText(stringDate, 115, 40)


      //recipient
      fontSize = 62; 
      ctx.font = `bold ${fontSize}px "Cairo, Bold" `
      ctx.fillStyle = '#b7410e'; 
      ctx.fillText(recipient, canvas.width / 2, 213)


      //signature
      fontSize = 36 
      ctx.font = `bold ${fontSize}px "Cairo, Bold" `
      ctx.fillStyle = '#b7410e'; 
      ctx.fillText(signature, canvas.width / 2, 584)




      //sentence
      fontSize = 36; 
      ctx.font = `bold ${fontSize}px "Cairo, Bold" `
      ctx.fillStyle = '#000000ff'; 
      let text = sentence.trim();
      text = text.split(" ")
      let space = 500; 
      let line = ''
      let textY = 329; 

      for (let n in text ) {

        line = line + text[n] + " "
        if (ctx.measureText(line).width >= space || n == text.length - 1 ) {
            ctx.fillText(line, canvas.width / 2, textY)
            line = ''
            textY += fontSize * 1.39; 
        }

      }



      res.setHeader('Content-Disposition', 'attachment; filename="image.png"');  //the name of image file
      res.setHeader('Content-Type', 'image/png'); // Set response type

      res.send(canvas.toBuffer());



    })

            
  
  })







 
// Export the Express app
//export default app;


app.listen( 3000 , () => {
  console.log ("server is ready")
})



