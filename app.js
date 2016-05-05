/**
 * Created by Administrator on 2016/4/28.
 */

var path = require('path');
var http = require("http");
var fs =require('fs');
var express =require('express');
var app= express();

//托管的静态文件
app.use(express.static(path.join(__dirname, 'app')));

//端口
app.set('port', process.env.PORT || 3000);



app.get('/', function(req, res) {
    console.log(__dirname);
    res.sendfile('app/index.html');
});

app.get('/getMenu', function(req, res) {
    var data = JSON.parse(fs.readFileSync('my.json'));
    console.log("getMenu success")
    res.json(data);
});


/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});