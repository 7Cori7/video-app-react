const express = require('express');
const http = require('http');
const cors = require('cors');

const { data } = require('./data');

const app = express();
const port = 3000;
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.get('/data/video', (req,res)=>{

    try{

        const videos = data;
        res.json(videos)
        
    }catch(error){
        console.log(error)
    }

})

server.listen(port, ()=>{
    console.log(`server is listening to port ${port}`)
})