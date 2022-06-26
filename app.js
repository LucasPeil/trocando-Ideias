require("dotenv").config()
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const userRoutes = require("../backend/routes/UserRoutes");
const postRoutes = require("../backend/routes/PostRoutes");


const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors({credentials:true, origin:"http://localhost:3000"}))

//db connection
require("./config/db")

// routes
app.use("/api/posts/",postRoutes);
app.use("/api/users/",userRoutes)

app.listen(port,()=>{
    console.log(`Site rodando na porta ${port}`);
})


