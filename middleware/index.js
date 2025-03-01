const express = require("express");
const app   = express();
const fs = require("fs");
const incommingRequestLoger = (req, res, next) => {

        fs.appendFileSync("./log.txt", req.method + " " + req.url + " " + new Date().toISOString() + "\n");
         next();
        
        }

module.exports = {incommingRequestLoger};