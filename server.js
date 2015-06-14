'use strict';

var express 		= require('express'),
	fs 				= require('fs'),
	session 		= require('express-session'),
	csrf 			= require('csurf'),
	compression 	= require('compression'),
	morgan 			= require('morgan');

var app 			= express(),
	conf 			= JSON.parse(fs.readFileSync('./conf.json', 'utf8'));

app.set('company', conf.company);
app.set('env', conf.environment || 'development');
app.set('port', process.env.PORT || conf.port || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.disable('x-powered-by');
app.set('jsonp callback name', 'cb');

var sess = {
	saveUninitialized: true,
	resave: true,
	secret: '3v0$()ft',
	cookie: {
		httpOnly: true
	}
};

if (app.get('env') === 'production') {
	app.enable('trust proxy');
	app.use(morgan('combined', {
		skip: function (req, res) {
			return res.statusCode < 400;
		},
		stream: fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'})
	}));
	sess.cookie.secure = true;
}

app.use(express.static(__dirname + '/public'));
app.use(compression());
app.use(session(sess));
app.use(csrf());
app.use(function (err, req, res, next) {
	if (err.code !== 'EBADCSRFTOKEN') {
		return next(err);
	}
	res.status(403);
	res.render('./http/403');
});

app.use('/', require('./routers/router'));

app.use(function(req, res, next) {
  res.status(404);
  res.render('./http/404');
});

app.listen(app.get('port'),  function() {
	console.log('Listening on port ' + app.get('port'));
});