const express=require("express");

const app = express();
//console.log("hello hi suyuog1");

/**
 * app.use is mtheod given by exress
 * pass a funct handler req- > res
 * 1. req: object reqpresenting actual req
 * 2. res: object representing res
 */
app.use(function cb(req,res) {
    console.log("inside use function");
    
    res.status(200).json({
        status:"success",
        message:"got the request"

    })
})


const port = process.env.PORT || 3000;


app.listen(port,function () {
    console.log("server is listening to port 3000");
})