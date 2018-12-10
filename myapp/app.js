var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var socketio = require('socket.io')
var bodyParser = require('body-parser');
var url = require('url');
var qs = require('querystring');

//미리 구현한 라우팅 모듈을 가져온다
var index = require('./routes/index');
//routes 폴더는 라우팅을 위한 폴더로 리로스 단위로 모듈 파일을 구현한다.
var app = express();

// view engine setup 내부적으로 모듈을 로드한다
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/images')));

 //정적파일 호스팅을 위한 경로 설정

//URL에 따라 라우팅 모듈을 설정
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
