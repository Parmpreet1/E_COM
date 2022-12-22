import app from "./app.mjs";
import dotenv from'dotenv'
dotenv.config()
let port=process.env.port
let host=process.env.host
app.listen(port,(err)=>{
    err? console.log("error in listening: ",err): console.log(`Go: http://${host}:${port}`)
})       