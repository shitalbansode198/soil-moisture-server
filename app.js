const { COPYFILE_EXCL } = require('constants');
const express = require('express');
const app = express();
const url = require('url');
const connectDB = require('./DBConfig');
const { Data } = require('./model');

connectDB();

app.get('/get', async (req, res) => {
    
    let collection = await Data.findOne({id: "1"});
    if(collection){
        res.status(200)
        res.json({
            data: collection.value
        });
    }else{
        res.status(400)
        res.json({
            data: "Bad request"
        });
    }
});

app.get('/set', async (req, res) => {
    const _url = new URL(`${req.hostname}:${process.env.PORT}${req.url}`);
    const  params = _url.searchParams;
    const value = params.get('value');
    const id = "1";
    let collection = await Data.findOne({id})
    if(collection){
        collection.value = value;
        collection.save();
    }else{
        collection = new Data({
            id: id,
            value: value
        });
        collection.save();
    }
    res.status(201);
    res.json({
        res: "OK"
    })
})

app.get('/', async (req, res) => {
    res.status(200);
    res.json({
        res: "All OK."
    })
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Up.");
})