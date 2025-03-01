const mongoose = require("mongoose");
const expess = require("express");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
const indexRouter = require("./routes/index");
const { incommingRequestLoger } = require("./middleware/index");
dotenv.config();
const app = expess();
const { mongo } = require("mongoose");
const userRouter = require("./routes/user");
// app.use(bodyParser.) // URL-encoded (Form Data) ==> send data
app.use(bodyParser.json(
    {
        urlencoded: true
    }
));
app.use(incommingRequestLoger);
app.use("/api/v1",indexRouter);
app.use("/api/v1/user",userRouter);


app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
    mongoose.connect(process.env.MONGOOSE_URI_STRINGS, { 
       
    });

    mongoose.connection.on("error", (err) => {
        console.log(err);
    })
    

});
