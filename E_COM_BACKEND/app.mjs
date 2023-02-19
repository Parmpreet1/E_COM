//packages
import express  from "express";
import session from "express-session";
//mudules
import products_route from "./product_routes.mjs";
import adminRoutes from './routes/admin_routes.mjs'
import { userRoute } from "./routes/user_routes.mjs";
const app=express()
app.use(express.urlencoded())
app.use(express.json({limit: '50mb'}))
//express session
app.use(session({
    secret:"my@secret#379",
    resave:false,
    saveUninitialized:false,
    name:"login",
    cookie:{secure:false}
}))


app.get('/',(req,res)=>{
    res.send("<h1 align='center'>Welcome to my API</h1>")
})
app.use(adminRoutes)
app.use(userRoute)
app.use(products_route)
export default app;