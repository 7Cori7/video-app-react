import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"), function (err){
        if(err){
            res.status(500).send(err);
        }
    });
});
  
server.listen(port, () => {
    console.log(`Frontend is running on port ${port}`);
});