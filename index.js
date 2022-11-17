var express = require('express');
var session = require('express-session');
var path = require('path');
var owasp = require('owasp-password-strength-test');

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

owasp.config({
    allowPassphrases: false,
    maxLength: 128,
    minLength: 8,
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/auth', function(req, res) {
    let password = req.body.password;
    console.log(password)
    var result = owasp.test(password);
    console.log(result);
    if(result.errors.length == 0) {
        res.send("Password is valid");
    } else {
        res.sendFile(path.join(__dirname + '/index.html'));
    }
});

app.listen(process.env.PORT || 3000);

module.exports = app;