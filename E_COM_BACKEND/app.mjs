import express  from "express";
import products_route from "./product_routes.mjs";
const app=express()

app.use(express.urlencoded())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("<h1 align='center'>Welcome to my API</h1>")
})
app.use(products_route)
export default app;