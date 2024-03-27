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

});

app.post('/data/video/likes', async (req,res)=>{

    //* FOR A DB CONNECTION
});


app.post('/data/video/dislikes', (req,res)=>{

    //* FOR A DB CONNECTION
});

server.listen(port, ()=>{
    console.log(`server is listening to port ${port}`)
});