import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
let data = JSON.parse(process.env.mysql);

export const myCon = () => {
  let myCon;
  const handleDisconnect = () => {
    myCon = mysql.createConnection({
      host: data.host,
      port: data.port,
      user: data.user,
      password: data.password,
      database: data.database,
    });
  };
  handleDisconnect();
  myCon.on('error',(err)=>{
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
      console.log("connection re generate")
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  })
  myCon.connect((err) => {
    err
      ? console.log("error in My Sql connection !", err)
      : console.log("Connection established with My Sql");
  });

  return myCon;
};
