const { Console } = require('console');
let express = require('express')
  , http = require('http')
  , path = require('path');

let app = express();
let router = require('./routes/router.js')(app);
let fs = require('fs');

// express 서버 실행
let server = app.listen(3000, function () {
    console.log("Express server has started on port 3000");
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/coin/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/coin/')));
app.engine('html', require('ejs').renderFile);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

////////////////////////// 소켓 설정 /////////////////////

let io = require('socket.io').listen(server);

let mobot_socket = require('./server/socket/mobot_socket')
mobot_socket.initialize(io);

//////////////////////////////////////////////////////////////
