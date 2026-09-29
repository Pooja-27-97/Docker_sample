const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 3030;
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const MONGO_URL = "mongodb://purple_night:purple_2797@localhost:27017";
const client = new MongoClient(MONGO_URL);

app.get("/getUsers", async(req, res) => {
    await client.connect(URL);
    console.log("Connected successful to server!");

    const db = client.db("my-sample-db");
    const data = await db.collection('users').find({}).toArray();

    client.close();
    res.send(data);
});

app.post("/addUser", async (req, res) => {
    const userObj = req.body;
    await client.connect(URL);
    console.log("Connected successful to server!");

    const db = client.db("my-sample-db");
    const data = await db.collection('users').insertOne(userObj);
    console.log(data);
    console.log("Data inserted in DB");
    client.close();
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});