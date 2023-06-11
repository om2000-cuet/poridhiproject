const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const redis = require('redis');




main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/poridhi");
  console.log("db connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const PoridhiSchema = new mongoose.Schema({
  name: String,
  age: String,
});
const PoridhiAdmin = mongoose.model("PoridhiAdmin", PoridhiSchema);

const server = express();
/*const redisClient = redis.createClient();*/
const redisClient = redis.createClient({
    host: 'localhost', // Redis server host
    port: 6379, // Redis server port
  });
  

 


server.use(cors());
server.use(bodyParser.json());
 

  
server.post("/demo", async (req, res) => {
  console.log(req.body);

  let user = new PoridhiAdmin();
  user.name = req.body.username;
  user.age = req.body.password;
  const doc = await user.save();
  console.log(doc);
  //res.send('hello');
  res.json(doc);
});

/*
server.get('/user', async (req, res) => {
    const redisKey = 'poridhi:users';
    redisClient.get(redisKey, async (error, cachedData) => {
      if (cachedData) {
        console.log('Users data found in Redis cache');
        const parsedData = JSON.parse(cachedData);
        res.json(parsedData);
      } else {
        console.log('Users data not found in Redis cache, querying MongoDB');
        const docs = await PoridhiAdmin.find({});
        const data = JSON.stringify(docs);
        redisClient.set(redisKey, data);
        res.json(docs);
      }
    });
  });
  */
  
  server.get('/user',async (req,res)=>{
    const docs = await PoridhiAdmin.find({});
    res.json(docs);
    })
 

server.listen("8080", () => {
  console.log("server started");
});
