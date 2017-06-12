const express = require("express");
const app = express();
const bodyParser = require('body-parser');//需要这个中间件来处理post请求
const config = require("./config/");

const {Home} = require("./model/");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
const db = mongoose.connection;
db.on("error",function(error) {
	console.log(`连接数据库失败：${error}`);
});
db.on("open",function() {
	console.log("连接数据库成功");
});
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Headers",'x-requested-with, accept, origin, content-type');//处理发送json数据，非简单请求
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});


app.get("/",function(req,res) {
	Home.find(function(err,data) {
		if( err ){
			console.log("查询数据库失败");
			return
		}
		res.send(data);
	});
});
app.post("/insert",function(req,res) {
	var data = req.body;
	var temp = new Home({
		name:data.name,
		age:data.age
	});
	temp.save().then( (data) => {
		res.send({
			code:1,
			data
		});
	});
});
app.post("/delete",function(req,res) {
	var data = req.body;
	Home.remove( {_id:data.id}, (err) => {
		if( err ){
			console.log(err);
			res.send({
				code:0
			});

		}else{
			res.send({
				code:1
			});
		}
	});
});

app.listen(config.port);