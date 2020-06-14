var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
	res.render("index", {title: "Computer is not working?"});
});

app.get("/about", function(req, res){
	res.render("about");
});

app.get("/contact", function(req, res){
	res.render("contact");
});

app.post("/contact/send", function(req, res){
	var transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "mail@gmail.com",
			pass: "SECRET!"
		}
	});

	var mailOptions = {
		from: "Ilya",
		to: "illiafun@yandex.com",
		subject: "Website Submission",
		text: "You have a submission with following details\nName: " + req.body.name + " \nEmail: " + req.body.email 
			+ " \nMessage: " + req.body.message,
		
	};

	transporter.sendMail(mailOptions, function(err, info){
		if(err)
		{
			console.log(err);
			res.redirect("/");
		}else {
			console.log("Message sent: " + info.response);
			res.redirect("/");
		}
	});

});

app.listen(3000);
console.log("Server is running on port 3000");