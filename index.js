const mongoose = require("mongoose");
const expess = require("express");

const dotenv = require("dotenv");
const indexRouter = require("./routes/index");
const { incommingRequestLoger } = require("./middleware/index");
dotenv.config();
const app = expess();
const { mongo } = require("mongoose");

app.use(incommingRequestLoger);
app.use("/api/v1",indexRouter);


app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
    mongoose.connect(process.env.MONGOOSE_URI_STRINGS, { 
       
    });

    mongoose.connection.on("error", (err) => {
        console.log(err);
    })
    

});
