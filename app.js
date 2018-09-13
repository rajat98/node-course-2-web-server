const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile("logs", `${log}\n`, (err) =>{
		if(err)
			console.log("unable to write");
	});
	next();
})
app.use((req, res, next) => {
	res.render("maintainenace.ejs");
});

app.get('/', (req, res) => {
	res.render("home.ejs", {
		title: "suuuuuup",
		body: "i'm home",
		currentDate: new Date().getFullYear()
	});

});

app.get('/about', (req, res) => {
	res.render('about', {
		title: "about",
		body: "wanna know anytjing bout me",
		currentDate: new Date().getFullYear()

	});
});
app.listen(port, () => {
	console.log(`server running at port ${port} ...`);
})