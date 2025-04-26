import app from "./index";
import {connect}  from "./db";

connect().then(() => {
    console.log("Mongo Connected")
});



app.listen(process.env.PORT, () => {
    console.log("Server started")
})