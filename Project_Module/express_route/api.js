const express=require("express");
const short=require("short-uuid");

const app = express();

const fs=require("fs");

const strContent=fs.readFileSync("./dev.json","utf-8");
const userDataStore=JSON.parse(strContent);
app.get("/api/user", function (req, res) {
    let msg = "";
    try {
        if (userDataStore.legth === 0) {
           throw new Error( "no user found");
        } else {
            msg = userDataStore;
        }
        res.status(200).json({
            status: "success",
            message: msg
        })
    } catch (error) {
        res.status(404).json({
            status: "failure",
            message: error.msg
        })
    }
})

app.use(express.json());

/**create user***/
app.post("/api/user",function (req,res) {
    const id = short.generate();
    const userDetails = res.body;
    userDetails.id = id;


    userDataStore.push(userDetails);
    
    const strUserDS= JSON.stringify(userDataStore);
    fs.writeFileSync("./dev.json",strUserDS);

    res.use(function cb(req,res) {
        res.status(200).json({
            status:"successfull",
            message:`update the user ${id}`
        })
    })
})



//it is user defined middlewear
app.use(function cb(req,res) {
    console.log("before",res.body);
    next();
})

//it is inbuilt middlewear
app.use(express.json())

app.use(function cb(req,res) {
    console.log("after",req.body);
    console.log("Hi i will be called everytime");
    next();
})

//when request on api/user execute this
app.post("",function (res,req) {
    console.log("i am inside post method");
    res.status(200).json({
        status:"success",
        message:"sending res from post method"
    })
})

//when request on api/user execute this
app.get("/api/user",function (req,res) {
    console.log("i am inside get method");
    res.status(200).json({
        status:"success",
        message:"sending res from get method"
    })
})

/**
 * app.use is mtheod given by exress
 * pass a funct handler req- > res
 * 1. req: object reqpresenting actual req
 * 2. res: object representing res
 */


const port = process.env.PORT || 3000;


app.listen(port,function () {
    console.log("server is listening to port 3000");
})