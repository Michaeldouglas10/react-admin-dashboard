import express from "express";
import userRoutes from "./routes/users.js"

import cors from "cors";

const port = process.env.PORT || 8800

const app = express()

app.use(express.json())
app.use(cors())

app.use("/",userRoutes)


app.listen(8800, ()=>{
    console.log("Rodando o servidor pronto.");
})