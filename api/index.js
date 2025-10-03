// Use "type: module" in package.json to use ES modules
import express from 'express';
const app = express();
 
// Define your routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

app.get('/home', (req, res) => {
  res.send("welcome home.");
});
 
// Export the Express app
export default app;