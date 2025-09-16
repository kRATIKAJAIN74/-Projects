const express = require("express");
const app = express();
const users = require("./routes/user.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser("secretcode"));
const flash = require('connect-flash');
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "mysupersecretstring", 
    resave: false, 
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res,next)=>{
res.locals.messages = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/register", (req, res)=> {
    let {name="anonymous"} = req.query;
    req.session.name = name;
    if(name=="anonymous"){
    req.flash("error", "user not registered.");
    } else {
    req.flash("success", "user registered successfully.");
    }
    res.redirect("/hello");
});

app.get("/hello",(req, res)=> {
    res.render("page.ejs", {name: req.session.name});
});

// app.get("/test", (req, res)=> {
//     res.send("Test successful.");
// });


// app.get("/reqCount", (req, res)=> {
//     if(req.session.count) {
//         req.session.count++;
//     } else {
//    req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times.`);
// });

app.listen("3000", ()=> {
    console.log("Server is listining to port 3000");
});

// app.get("/getsignedcookie", (req, res)=> {
//     res.cookie("made-in", "India", {signed: true});
//     res.send("signed cookie sent.");
// });

// app.get("/verify", (req, res)=> {
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/getcookies", (req, res)=> {
//     res.cookie("greet", "hello");
//     res.send("sent you some cookies.")
// })
// app.get("/", (req, res)=> {
//     console.dir(req.cookies);
//     res.send("Hi, I am root.");
// });
