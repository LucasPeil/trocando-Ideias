require("dotenv").config()
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors({credentials:true, origin:"http://localhost:3000"}))

app.listen(port,()=>{
    console.log(`Site rodando na porta ${port}`);
})


