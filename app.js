// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(express.static("public")); // for using style.css file
app.use(bodyParser.urlencoded({extended: true})); // for receiving the data in the terminal


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        member: [
            {
                email_address: email,
                status: "Subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);  // data convert into language

    const url = "https://us13.api.mailchimp.com/3.0/lists/5fcc83820c";

    const Option = {
        method: "POST",
        auth: "aditya1:19a1f7e519579283e2fe518bfc360a12-us13"
    }

    const request = https.request(url, Option, function(response) {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }else {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    }) 

    request.write(jsonData);
    request.end();

})

app.post("/failure", function(req, res) {
    res.redirect("/");
})


app.listen(process.env.PORT || 5000, function() {
    console.log("Server in running on port 5000");
})

// api Key
// 19a1f7e519579283e2fe518bfc360a12-us13

// id
// 5fcc83820c