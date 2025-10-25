const fs = require("fs")

// Path to your file
const filePath = "./api/data.json";


const rawData = fs.readFileSync(filePath, "utf8");

// 2. Parse it into a JavaScript object
const data = JSON.parse(rawData);

// 3. Modify the data (for example, add a new post)
data.push({ id: 3, title: "New Post Added" });

// 4. Convert the updated object back to JSON text
const updatedJson = JSON.stringify(data, null, 2);

// 5. Write it back to the file
fs.writeFileSync(filePath, updatedJson, "utf8");


