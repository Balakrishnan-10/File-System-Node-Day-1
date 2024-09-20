// importing part:
import express from "express";
import fs from 'fs';
import { format } from "date-fns";
import path from "path";
import { fileURLToPath } from 'url';


// Decralation and Initialization part:
const app = express();
// Create a port:
const PORT = 4000;

// Middleware:
app.use(express.json());

// Utility to GET Dirname:
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

//Default Route:
app.get('/',(req,res) => {
    res.status(200).send('Welocme to the File System Task, If you want to create Timestamp give /create (or) If you want to read the created Timestamp give /read along with the Render url')
})

// Create Route:
app.get('/create',(req,res) => {
    let today = format(new Date(), 'dd-mm-yyyy-HH-mm-ss');
    // console.log(today)
    const filepath = `Timestamp/${today}.txt`;
    fs.writeFileSync(filepath,`${today}`,'utf8');
    res.status(200).send(`Timestamp are created successfully ${today}`)
});

// Read Route:
app.get('/read',(req,res) => {
    const dirpath = path.join(dirname, './Timestamp');
    let fileData = [];

    fs.readdirSync(dirpath).forEach(file => {
        const filepath = path.join(dirpath,file);
        const data = fs.readFileSync(filepath,'utf8');
        fileData.push({file,data});
    });
    res.status(200).send(fileData);

});

// Running Part:
app.listen(PORT,() =>{
    console.log("server is running");
})